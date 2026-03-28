import React, { useState, useEffect } from 'react';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../services/media-service';
import { getGeneros } from '../services/genero-service';
import { getDirectores } from '../services/director-service';
import { getProductoras } from '../services/productora-service';
import { getTipos } from '../services/tipo-service';
import Swal from 'sweetalert2';
import { SkeletonCard } from '../components/ui/skeleton';
import { MediaDetailModal } from '../components/ui/media-detail-modal';

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
            Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
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

        // Crear FormData para enviar el archivo
        const formData = new FormData();
        Object.keys(formValues).forEach(key => {
            // El serial es auto-generado: nunca se envía al backend
            if (key === 'serial') return;
            // No enviar 'imagen' si está vacío (evita errores de casteo en el backend)
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
            Swal.fire('Error', error.response?.data?.msg || 'Error al procesar la solicitud', 'error');
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
                Swal.fire('Error', 'Error al eliminar la película', 'error');
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
                <h2 className="text-info fw-bold" style={{ textShadow: '0 0 10px rgba(0,229,255,0.3)' }}>Cine Digital - Catálogo Media</h2>
                <button
                    className="btn btn-outline-info btn-lg fw-bold shadow-sm"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? '▲ Ocultar Formulario' : '▼ Añadir Película/Serie'}
                </button>
            </div>

            {isFormVisible && (
                <div className="card glass-panel mb-5 border-info">
                    <div className="card-header bg-info text-dark fw-bold">
                        <h4 className="mb-0">{isEditing ? 'Editar Registro' : 'Nueva Película / Serie'}</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={processMediaSubmission}>
                            <div className="row">
                                {/* Serial: visible solo al editar, completamente de solo lectura */}
                                {isEditing && (
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label fw-bold text-secondary">Serial (auto-generado)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-secondary text-white">🔒</span>
                                            <input
                                                type="text"
                                                value={formValues.serial}
                                                className="form-control"
                                                disabled
                                                readOnly
                                                style={{ opacity: 0.75, cursor: 'not-allowed', backgroundColor: '#2a2a2a', color: '#adb5bd' }}
                                            />
                                        </div>
                                        <small className="text-secondary">El sistema asigna el serial automáticamente.</small>
                                    </div>
                                )}
                                <div className={`${isEditing ? 'col-md-6' : 'col-md-9'} mb-3`}>
                                    <label className="form-label fw-bold">Título</label>
                                    <input type="text" name="titulo" value={formValues.titulo} onChange={updateFormValue} className="form-control" required />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label fw-bold">Año de Estreno</label>
                                    <input type="number" name="anioEstreno" value={formValues.anioEstreno} onChange={updateFormValue} className="form-control" required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">URL (Enlace de reproducción)</label>
                                    <input type="url" name="url" value={formValues.url} onChange={updateFormValue} className="form-control" required placeholder="https://..." />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Subir Imagen (Poster)</label>
                                    <input
                                        type="file"
                                        name="imagen"
                                        onChange={updateFormValue}
                                        className="form-control"
                                        accept="image/*"
                                    />
                                    {isEditing && !formValues.imagen?.name && (
                                        <small className="text-info mt-1 d-block">Imagen actual: {medias.find(m => m._id === activeId)?.imagen?.split('/').pop()}</small>
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label className="form-label fw-bold">Género</label>
                                    <select name="genero" value={formValues.genero} onChange={updateFormValue} className="form-select" required>
                                        <option value="" disabled hidden>Seleccione Género...</option>
                                        {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label fw-bold">Director</label>
                                    <select name="director" value={formValues.director} onChange={updateFormValue} className="form-select" required>
                                        <option value="" disabled hidden>Seleccione Director...</option>
                                        {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label fw-bold">Productora</label>
                                    <select name="productora" value={formValues.productora} onChange={updateFormValue} className="form-select" required>
                                        <option value="" disabled hidden>Seleccione Productora...</option>
                                        {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label fw-bold">Tipo</label>
                                    <select name="tipo" value={formValues.tipo} onChange={updateFormValue} className="form-select" required>
                                        <option value="" disabled hidden>Seleccione Tipo...</option>
                                        {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Sinopsis</label>
                                <textarea name="sinopsis" value={formValues.sinopsis} onChange={updateFormValue} className="form-control" rows="3"></textarea>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-6 mb-2">
                                    <button type="button" onClick={cancelFormOperation} className="btn btn-outline-secondary w-100 py-3 fw-bold text-uppercase border-2">
                                        ❌ Cancelar
                                    </button>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <button type="submit" className="btn btn-info w-100 py-3 fw-bold text-dark shadow-lg text-uppercase">
                                        {isEditing ? '💾 ACTUALIZAR REGISTRO' : '🚀 GUARDAR EN CATÁLOGO'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="row bg-dark p-4 rounded shadow">
                {isLoading ? (
                    // Mostrar Skeletons mientras carga
                    Array.from({ length: 4 }).map((_, i) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={i}>
                            <SkeletonCard />
                        </div>
                    ))
                ) : medias.length === 0 ? (
                    <div className="col-12 text-center text-white py-5">
                        <h4 className="text-muted">No hay producciones disponibles aún.</h4>
                        <p>Haz clic en "Añadir Película/Serie" para empezar.</p>
                    </div>
                ) : (
                    medias.map(media => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={media._id}>
                            <div className="card h-100 bg-black text-white border-0 shadow-lg">
                                <img
                                    src={media.imagen || 'https://via.placeholder.com/300x450?text=Sin+Poster'}
                                    className="card-img-top"
                                    alt={media.titulo}
                                    style={{ height: '350px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Poster'; }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-danger fw-bold text-truncate" title={media.titulo}>{media.titulo}</h5>
                                    <p className="card-text small text-truncate" title={media.sinopsis} style={{ flexGrow: 1 }}>{media.sinopsis || 'Sin descripción'}</p>

                                    <div className="d-flex justify-content-between mt-2 align-items-center">
                                        <span className="badge bg-danger rounded-pill px-3 py-2">{media.anioEstreno}</span>
                                        <span className="badge bg-secondary rounded-pill">{media.tipo?.nombre}</span>
                                    </div>
                                    <div className="mt-2 text-muted small text-truncate">
                                        🎬 {media.director?.nombres} | {media.genero?.nombre}
                                    </div>

                                    <div className="d-grid mt-3">
                                        <button
                                            className="btn btn-sm btn-info fw-bold text-dark shadow-sm py-2"
                                            onClick={() => openDetailView(media)}
                                        >
                                            👁️ VER DETALLES
                                        </button>
                                    </div>

                                    <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-center flex-nowrap">
                                        <button className="btn btn-sm btn-outline-info btn-action" onClick={() => editMediaRecord(media)}>Editar</button>
                                        <button className="btn btn-sm btn-outline-danger btn-action" onClick={() => removeMediaItem(media._id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Panel de Estadísticas (Mini Dashboard) Reubicado al final */}
            <div className="row mt-5 mb-5 text-center pt-5 border-top border-secondary">
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card glass-panel p-3 h-100 border-0 shadow">
                        <h6 className="text-secondary small text-uppercase fw-bold">🎬 Total Producciones</h6>
                        <h2 className="text-white fw-black mb-0">{medias.length}</h2>
                        <div className="progress mt-2" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                            <div className="progress-bar bg-danger" style={{ width: '70%', borderRadius: '10px' }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card glass-panel p-3 h-100 border-0 shadow">
                        <h6 className="text-secondary small text-uppercase fw-bold">🎞️ Géneros Activos</h6>
                        <h2 className="text-white fw-black mb-0">{generos.length}</h2>
                        <div className="progress mt-2" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                            <div className="progress-bar bg-info" style={{ width: '45%', borderRadius: '10px' }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card glass-panel p-3 h-100 border-0 shadow">
                        <h6 className="text-secondary small text-uppercase fw-bold">🎥 Directores</h6>
                        <h2 className="text-white fw-black mb-0">{directores.length}</h2>
                        <div className="progress mt-2" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                            <div className="progress-bar bg-warning" style={{ width: '60%', borderRadius: '10px' }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card glass-panel p-3 h-100 border-0 shadow">
                        <h6 className="text-secondary small text-uppercase fw-bold">🏢 Productoras</h6>
                        <h2 className="text-white fw-black mb-0">{productoras.length}</h2>
                        <div className="progress mt-2" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                            <div className="progress-bar bg-success" style={{ width: '80%', borderRadius: '10px' }}></div>
                        </div>
                    </div>
                </div>
            </div>

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
