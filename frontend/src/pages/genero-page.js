import React, { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../services/genero-service';
import { SkeletonRow } from '../components/ui/skeleton';
import Swal from 'sweetalert2';

export const GeneroPage = () => {

    const [generos, setGeneros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [formValues, setFormValues] = useState({
        nombre: '',
        estado: 'Activo',
        descripcion: ''
    });

    const fetchGeneros = async () => {
        setIsLoading(true);
        try {
            const response = await getGeneros();
            setGeneros(response.data);
        } catch (error) {
            console.error('Error fetching generos', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGeneros();
    }, []);

    const updateFormValue = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value });
    };

    const processGeneroSubmission = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateGenero(activeId, formValues);
                Swal.fire('Actualizado', 'El género ha sido actualizado correctamente', 'success');
            } else {
                await createGenero(formValues);
                Swal.fire('Creado', 'El género ha sido creado exitosamente', 'success');
            }
            
            // Clean form and reload data
            setFormValues({ nombre: '', estado: 'Activo', descripcion: '' });
            setIsEditing(false);
            setActiveId(null);
            fetchGeneros();

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un error al procesar la solicitud', 'error');
        }
    };

    const editGeneroRecord = (genero) => {
        setFormValues({
            nombre: genero.nombre,
            estado: genero.estado,
            descripcion: genero.descripcion || ''
        });
        setIsEditing(true);
        setActiveId(genero._id);
    };

    const removeGeneroItem = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!'
        });

        if (result.isConfirmed) {
            try {
                await deleteGenero(id);
                fetchGeneros();
                Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se puede eliminar mientras haya dependencias activas', 'error');
            }
        }
    };

    const cancelEditOperation = () => {
        setFormValues({ nombre: '', estado: 'Activo', descripcion: '' });
        setIsEditing(false);
        setActiveId(null);
    };

    return (
        <div className="container-fluid mt-3 mb-5">
            <h2 className="text-info fw-bold mb-4" style={{textShadow: '0 0 10px rgba(0,229,255,0.2)'}}>Administración de Géneros</h2>
            
            <div className="row">
                {/* Formulario a la izquierda */}
                <div className="col-md-4 mb-4">
                    <div className="card glass-panel border-0 shadow-lg border-info">
                        <div className="card-header form-header-white text-center border-0">
                            <h5 className="mb-0">{isEditing ? 'Editar Género' : 'Nuevo Género'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={processGeneroSubmission}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        value={formValues.nombre} 
                                        onChange={updateFormValue} 
                                        className="form-control" 
                                        required 
                                        placeholder="Ej. Acción"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select 
                                        name="estado" 
                                        value={formValues.estado} 
                                        onChange={updateFormValue} 
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
                                        onChange={updateFormValue} 
                                        className="form-control" 
                                        rows="3"
                                        placeholder="Características del género..."
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="btn btn-info w-100 mb-2 fw-bold text-dark shadow">
                                    {isEditing ? 'Guardar Cambios' : 'Añadir Género'}
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

                {/* Tabla a la derecha */}
                <div className="col-md-8">
                    <div className="card glass-panel border-0 shadow-lg">
                        <div className="card-body p-0">
                            <table className="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Estado</th>
                                        <th>Descripción</th>
                                        <th>FECHA CREACIÓN</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                                    ) : generos.map(genero => (
                                        <tr key={genero._id}>
                                            <td>{genero.nombre}</td>
                                            <td>
                                                <span className={`badge ${genero.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                                                    {genero.estado}
                                                </span>
                                            </td>
                                            <td>{genero.descripcion || 'Sin descripción'}</td>
                                            <td>{new Date(genero.fechaCreacion).toLocaleDateString()}</td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => editGeneroRecord(genero)} 
                                                    className="btn btn-sm btn-outline-info btn-action"
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    onClick={() => removeGeneroItem(genero._id)} 
                                                    className="btn btn-sm btn-outline-danger btn-action"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {generos.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">No hay géneros creados aún.</td>
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
