import React, { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../services/directorService';
import { SkeletonRow } from '../components/ui/Skeleton';
import Swal from 'sweetalert2';

export const DirectorPage = () => {

    const [directores, setDirectores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [formValues, setFormValues] = useState({
        nombres: '',
        estado: 'Activo'
    });

    const fetchDirectores = async () => {
        setLoading(true);
        try {
            const { data } = await getDirectores();
            setDirectores(data);
        } catch (error) {
            console.error('Error fetching directores', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDirectores();
    }, []);

    const handleInputChange = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateDirector(activeId, formValues);
                Swal.fire('Actualizado', 'Director actualizado correctamente', 'success');
            } else {
                await createDirector(formValues);
                Swal.fire('Creado', 'Director creado exitosamente', 'success');
            }
            
            setFormValues({ nombres: '', estado: 'Activo' });
            setIsEditing(false);
            setActiveId(null);
            fetchDirectores();

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un error al procesar la solicitud', 'error');
        }
    };

    const handleEdit = (director) => {
        setFormValues({ nombres: director.nombres, estado: director.estado });
        setIsEditing(true);
        setActiveId(director._id);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar director?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!'
        });

        if (result.isConfirmed) {
            try {
                await deleteDirector(id);
                fetchDirectores();
                Swal.fire('Eliminado!', 'El director fue eliminado.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el recurso', 'error');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormValues({ nombres: '', estado: 'Activo' });
        setIsEditing(false);
        setActiveId(null);
    };

    return (
        <div className="container-fluid mt-3 mb-5">
            <h2 className="text-info fw-bold mb-4" style={{textShadow: '0 0 10px rgba(0,229,255,0.2)'}}>Administración de Directores</h2>
            
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card glass-panel border-0 shadow-lg border-info">
                        <div className="card-header form-header-white text-center border-0">
                            <h5 className="mb-0">{isEditing ? 'Editar Director' : 'Nuevo Director'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombres Completos</label>
                                    <input 
                                        type="text" 
                                        name="nombres" 
                                        value={formValues.nombres} 
                                        onChange={handleInputChange} 
                                        className="form-control" 
                                        required 
                                        placeholder="Ej. Christopher Nolan"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select 
                                        name="estado" 
                                        value={formValues.estado} 
                                        onChange={handleInputChange} 
                                        className="form-select"
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="btn btn-info w-100 mb-2 fw-bold text-dark shadow">
                                    {isEditing ? 'Guardar Cambios' : 'Añadir Director'}
                                </button>
                                
                                {isEditing && (
                                    <button type="button" onClick={handleCancelEdit} className="btn btn-secondary w-100">
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
                                        <th>Nombres</th>
                                        <th>Estado</th>
                                        <th>FECHA CREACIÓN</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                                    ) : directores.map(dir => (
                                        <tr key={dir._id}>
                                            <td>{dir.nombres}</td>
                                            <td>
                                                <span className={`badge ${dir.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                                                    {dir.estado}
                                                </span>
                                            </td>
                                            <td>{new Date(dir.fechaCreacion).toLocaleDateString()}</td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => handleEdit(dir)} 
                                                    className="btn btn-sm btn-outline-info btn-action"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(dir._id)} 
                                                    className="btn btn-sm btn-outline-danger btn-action"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {directores.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted">No hay directores registrados.</td>
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
