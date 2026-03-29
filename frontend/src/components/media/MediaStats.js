import React from 'react';

export const MediaStats = ({ medias, generos, directores, productoras }) => {
    return (
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
    );
};
