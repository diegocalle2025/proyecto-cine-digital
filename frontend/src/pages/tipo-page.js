import React, { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../services/tipo-service';
import { SkeletonRow } from '../components/ui/skeleton';
import Swal from 'sweetalert2';

export const TipoPage = () => {

    const [tipos, setTipos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [formValues, setFormValues] = useState({
        nombre: '',
        descripcion: ''
    });

    const fetchTipos = async () => {
        setIsLoading(true);
        try {
            const response = await getTipos();
            setTipos(response.data);
        } catch (error) {
            console.error('Error fetching tipos', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTipos();
    }, []);

    const updateFormValue = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value });
    };

    const processTipoSubmission = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateTipo(activeId, formValues);
                Swal.fire('Actualizado', 'Tipo actualizado correctamente', 'success');
            } else {
                await createTipo(formValues);
                Swal.fire('Creado', 'Tipo de contenido creado', 'success');
            }
            
            setFormValues({ nombre: '', descripcion: '' });
            setIsEditing(false);
            setActiveId(null);
            fetchTipos();

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un error al procesar la solicitud', 'error');
        }
    };

    const editTipoRecord = (tipo) => {
        setFormValues({
            nombre: tipo.nombre,
            descripcion: tipo.descripcion || ''
        });
        setIsEditing(true);
        setActiveId(tipo._id);
    };

    const removeTipoItem = async (id) => {
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
                await deleteTipo(id);
                fetchTipos();
                Swal.fire('Eliminado!', 'El registro fue borrado exitosamente.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Error al eliminar este tipo', 'error');
            }
        }
    };

    const cancelEditOperation = () => {
        setFormValues({ nombre: '', descripcion: '' });
        setIsEditing(false);
        setActiveId(null);
    };

    return (
        <div className="container-fluid mt-3 mb-5">
            <h2 className="text-info fw-bold mb-4" style={{textShadow: '0 0 10px rgba(0,229,255,0.2)'}}>Administración de Tipos</h2>
            
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card glass-panel border-0 shadow-lg border-info">
                        <div className="card-header form-header-white text-center border-0">
                            <h5 className="mb-0">{isEditing ? 'Editar Tipo' : 'Nuevo Tipo'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={processTipoSubmission}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre Categórico</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        value={formValues.nombre} 
                                        onChange={updateFormValue} 
                                        className="form-control" 
                                        required 
                                        placeholder="Ej. Serie de TV"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea 
                                        name="descripcion" 
                                        value={formValues.descripcion} 
                                        onChange={updateFormValue} 
                                        className="form-control" 
                                        rows="3"
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="btn btn-info w-100 mb-2 fw-bold text-dark shadow">
                                    {isEditing ? 'Guardar Cambios' : 'Añadir Tipo'}
                                </button>
                                
                                {isEditing && (
                                    <button type="button" onClick={cancelEditOperation} className="btn btn-secondary w-100">
                                        Cancelar Edición
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card glass-panel border-0 shadow-lg">
                        <div className="card-body p-0">
                            <table className="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Nombre Categoría</th>
                                        <th>Descripción</th>
                                        <th>FECHA CREACIÓN</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                                    ) : tipos.map(item => (
                                        <tr key={item._id}>
                                            <td><strong>{item.nombre}</strong></td>
                                            <td>{item.descripcion || '—'}</td>
                                            <td>{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => editTipoRecord(item)} 
                                                    className="btn btn-sm btn-outline-info btn-action"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => removeTipoItem(item._id)} 
                                                    className="btn btn-sm btn-outline-danger btn-action"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {tipos.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted">Aún no hay categorías/tipos definidos.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
