import React from 'react';

export const MediaForm = ({ 
    formValues, 
    updateFormValue, 
    processMediaSubmission, 
    isEditing, 
    cancelFormOperation, 
    generos, 
    directores, 
    productoras, 
    tipos 
}) => {
    return (
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
    );
};
