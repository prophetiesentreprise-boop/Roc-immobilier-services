function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export function VideoEmbed({ url }: { url: string }) {
  const embedUrl = getEmbedUrl(url);

  if (embedUrl) {
    return (
      <div className="aspect-video overflow-hidden rounded-sm border border-ligne">
        <iframe
          src={embedUrl}
          title="Vidéo du bien"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Sinon on suppose un fichier vidéo hébergé directement (.mp4, .mov...)
  return (
    <div className="aspect-video overflow-hidden rounded-sm border border-ligne bg-black">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={url} controls className="h-full w-full" />
    </div>
  );
}
