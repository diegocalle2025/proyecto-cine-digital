import React, { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../services/productoraService';
import { SkeletonRow } from '../components/ui/Skeleton';
import Swal from 'sweetalert2';

export const ProductoraPage = () => {

    const [productoras, setProductoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [formValues, setFormValues] = useState({
        nombre: '',
        estado: 'Activo',
        slogan: '',
        descripcion: ''
    });

    const fetchProductoras = async () => {
        setLoading(true);
        try {
            const { data } = await getProductoras();
            setProductoras(data);
        } catch (error) {
            console.error('Error fetching productoras', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductoras();
    }, []);

    const handleInputChange = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateProductora(activeId, formValues);
                Swal.fire('Actualizado', 'Productora actualizada correctamente', 'success');
            } else {
                await createProductora(formValues);
                Swal.fire('Creada', 'Productora creada exitosamente', 'success');
            }
            
            setFormValues({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
            setIsEditing(false);
            setActiveId(null);
            fetchProductoras();

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un error al procesar la solicitud', 'error');
        }
    };

    const handleEdit = (prod) => {
        setFormValues({
            nombre: prod.nombre,
            estado: prod.estado,
            slogan: prod.slogan || '',
            descripcion: prod.descripcion || ''
        });
        setIsEditing(true);
        setActiveId(prod._id);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar productora?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!'
        });

        if (result.isConfirmed) {
            try {
                await deleteProductora(id);
                fetchProductoras();
                Swal.fire('Eliminada!', 'El registro fue eliminado.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el recurso por la integridad referencial', 'error');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormValues({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
        setIsEditing(false);
        setActiveId(null);
    };

    return (
        <div className="container-fluid mt-3 mb-5">
            <h2 className="text-info fw-bold mb-4" style={{textShadow: '0 0 10px rgba(0,229,255,0.2)'}}>Administración de Productoras</h2>
            
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card glass-panel border-0 shadow-lg border-info">
                        <div className="card-header form-header-white text-center border-0">
                            <h5 className="mb-0">{isEditing ? 'Editar Productora' : 'Nueva Productora'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        value={formValues.nombre} 
                                        onChange={handleInputChange} 
                                        className="form-control" 
                                        required 
                                        placeholder="Ej. Warner Bros"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Slogan</label>
                                    <input 
                                        type="text" 
                                        name="slogan" 
                                        value={formValues.slogan} 
                                        onChange={handleInputChange} 
                                        className="form-control" 
                                        placeholder="Slogan opcional"
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
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea 
                                        name="descripcion" 
                                        value={formValues.descripcion} 
                                        onChange={handleInputChange} 
                                        className="form-control" 
                                        rows="2"
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="btn btn-info w-100 mb-2 fw-bold text-dark shadow">
                                    {isEditing ? 'Guardar Cambios' : 'Añadir Productora'}
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
                                        <th>Nombre</th>
                                        <th>Estado</th>
                                        <th>Slogan</th>
                                        <th>FECHA CREACIÓN</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                                    ) : productoras.map(prod => (
                                        <tr key={prod._id}>
                                            <td>{prod.nombre}</td>
                                            <td>
                                                <span className={`badge ${prod.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                                                    {prod.estado}
                                                </span>
                                            </td>
                                            <td><small>{prod.slogan || 'N/A'}</small></td>
                                            <td>{new Date(prod.fechaCreacion).toLocaleDateString()}</td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => handleEdit(prod)} 
                                                    className="btn btn-sm btn-outline-info btn-action"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(prod._id)} 
                                                    className="btn btn-sm btn-outline-danger btn-action"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {productoras.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">No hay productoras registradas.</td>
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
