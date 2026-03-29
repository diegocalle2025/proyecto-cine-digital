import React, { useState, useEffect } from 'react';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../services/media-service';
import { getGeneros } from '../services/genero-service';
import { getDirectores } from '../services/director-service';
import { getProductoras } from '../services/productora-service';
import { getTipos } from '../services/tipo-service';
import Swal from 'sweetalert2';
import { MediaDetailModal } from '../components/ui/media-detail-modal';

// Importación de sub-componentes refactorizados
import { MediaForm } from '../components/media/MediaForm';
import { MediaGrid } from '../components/media/MediaGrid';
import { MediaStats } from '../components/media/MediaStats';

export const MediaPage = () => {

    const [medias, setMedias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Estados para el Modal de Detalle
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const initialState = {
        serial: '', titulo: '', sinopsis: '', url: '', imagen: '',
        anioEstreno: '', genero: '', director: '', productora: '', tipo: ''
    };

    const [formValues, setFormValues] = useState(initialState);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [respMedia, respGenero, respDir, respProd, respTipo] = await Promise.all([
                getMedias(), getGeneros(), getDirectores(), getProductoras(), getTipos()
            ]);

            setMedias(respMedia.data);

            // Requisito del Caso de Estudio: Solo seleccionar entidades "Activas"
            setGeneros(respGenero.data.filter(g => g.estado === 'Activo'));
            setDirectores(respDir.data.filter(d => d.estado === 'Activo'));
            setProductoras(respProd.data.filter(p => p.estado === 'Activo'));
            setTipos(respTipo.data);

        } catch (error) {
            console.error('Error fetching data', error);
            // El interceptor de Axios ya maneja las alertas de error globales, 
            // pero aquí podemos manejar lógica específica si fuera necesario.
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateFormValue = ({ target }) => {
        const { name, value, type, files } = target;
        if (type === 'file') {
            setFormValues({ ...formValues, [name]: files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const processMediaSubmission = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(formValues).forEach(key => {
            if (key === 'serial') return;
            if (key === 'imagen' && !formValues[key]) return;
            if (formValues[key] !== null && formValues[key] !== undefined) {
                formData.append(key, formValues[key]);
            }
        });

        try {
            if (isEditing) {
                await updateMedia(activeId, formData);
                Swal.fire('Actualizada', 'Película actualizada correctamente', 'success');
            } else {
                await createMedia(formData);
                Swal.fire('Creada', 'Película añadida al catálogo', 'success');
            }

            setFormValues(initialState);
            setIsEditing(false);
            setActiveId(null);
            setIsFormVisible(false);
            fetchData();

        } catch (error) {
            console.error(error);
            // Swal.fire ya es llamado por el Interceptor de Axios centralizado.
        }
    };

    const editMediaRecord = (m) => {
        setFormValues({
            serial: m.serial,
            titulo: m.titulo,
            sinopsis: m.sinopsis || '',
            url: m.url,
            imagen: m.imagen || '',
            anioEstreno: m.anioEstreno,
            genero: m.genero?._id || '',
            director: m.director?._id || '',
            productora: m.productora?._id || '',
            tipo: m.tipo?._id || ''
        });
        setIsEditing(true);
        setActiveId(m._id);
        setIsFormVisible(true);
        window.scrollTo(0, 0);
    };

    const removeMediaItem = async (id) => {
        const result = await Swal.fire({
            title: '¿Confirmar eliminación?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!'
        });

        if (result.isConfirmed) {
            try {
                await deleteMedia(id);
                fetchData();
                Swal.fire('Eliminado!', 'El contenido fue borrado.', 'success');
            } catch (error) {
                // El interceptor centralizado maneja el error.
            }
        }
    };

    const cancelFormOperation = () => {
        setFormValues(initialState);
        setIsEditing(false);
        setActiveId(null);
        setIsFormVisible(false);
    };

    const openDetailView = (m) => {
        setSelectedMedia(m);
        setIsDetailModalVisible(true);
    };

    const closeDetailView = () => {
        setSelectedMedia(null);
        setIsDetailModalVisible(false);
    };

    return (
        <div className="container-fluid mt-3 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-info pb-2">
                <h2 className="text-info fw-bold" style={{ textShadow: '0 0 10px rgba(0,229,255,0.3)' }}>
                    Cine Digital - Catálogo Media
                </h2>
                <button
                    className="btn btn-outline-info btn-lg fw-bold shadow-sm"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? '▲ Ocultar Formulario' : '▼ Añadir Película/Serie'}
                </button>
            </div>

            {isFormVisible && (
                <MediaForm 
                    formValues={formValues}
                    updateFormValue={updateFormValue}
                    processMediaSubmission={processMediaSubmission}
                    isEditing={isEditing}
                    cancelFormOperation={cancelFormOperation}
                    generos={generos}
                    directores={directores}
                    productoras={productoras}
                    tipos={tipos}
                />
            )}

            <MediaGrid 
                medias={medias}
                isLoading={isLoading}
                editMediaRecord={editMediaRecord}
                removeMediaItem={removeMediaItem}
                openDetailView={openDetailView}
            />

            <MediaStats 
                medias={medias}
                generos={generos}
                directores={directores}
                productoras={productoras}
            />

            {/* Modal de Detalle */}
            {isDetailModalVisible && (
                <MediaDetailModal
                    media={selectedMedia}
                    onClose={closeDetailView}
                />
            )}
        </div>
    );
};
