import React from 'react';
import { useTrackers } from '../context/TrackerContext';

const EmbedsSection: React.FC = () => {
    const { trackers } = useTrackers();

    if (!trackers.youtubeEmbed && !trackers.vimeoEmbed && !trackers.googleMaps) {
        return null;
    }

    return (
        <div className="mt-12 space-y-8">
            {/* YouTube Embed */}
            {trackers.youtubeEmbed && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Video (YouTube Embed)</h3>
                    <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden relative">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Vimeo Embed */}
            {trackers.vimeoEmbed && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product Demo (Vimeo Embed)</h3>
                    <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden relative">
                        <iframe
                            src="https://player.vimeo.com/video/76979871"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title="Vimeo Video"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Google Maps Embed */}
            {trackers.googleMaps && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Our Location (Google Maps)</h3>
                    <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1508.8749833075217!2d-122.0834167123985!3d37.42238479532598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367!2sGoogleplex!5e0!3m2!1sen!2sus!4v1617135064506!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmbedsSection;
