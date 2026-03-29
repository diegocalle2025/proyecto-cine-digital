import React from 'react';
import { MediaCard } from './MediaCard';
import { SkeletonCard } from '../ui/skeleton';

export const MediaGrid = ({ medias, isLoading, editMediaRecord, removeMediaItem, openDetailView }) => {
    return (
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
                        <MediaCard 
                            media={media} 
                            editMediaRecord={editMediaRecord} 
                            removeMediaItem={removeMediaItem} 
                            openDetailView={openDetailView}
                        />
                    </div>
                ))
            )}
        </div>
    );
};
