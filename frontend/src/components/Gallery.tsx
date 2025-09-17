import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { X } from 'lucide-react';
import './Gallery.css';
import grampanchayatImg from '../assets/images/grampanchayat.webp';
import GateImg from '../assets/images/gate.webp';
import zpImg from '../assets/images/School.webp';
import OfficerImg from '../assets/images/commitee.webp';
import templeImg from '../assets/images/mandir.webp';
import upsarpanchImg from '../assets/images/Upsarpanch.png';
import sarpanchImg from '../assets/images/Sarpanchweb.webp';
import heritageImg from '../assets/images/Adhikari.png';
import event1Img from '../assets/images/event1.jpg';
import event2Img from '../assets/images/event2.jpg';
import event3Img from '../assets/images/event3.jpg';
import event4Img from '../assets/images/event4.jpg';

// Type definitions
interface ImageData {
  id: number;
  src: string;
  alt: string;
  title: string;
}

interface GridItem {
  gridArea: string;
  index: number;
}

interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}

interface GalleryItemProps {
  item: GridItem;
  idx: number;
  image: ImageData;
  observer: IntersectionObserver | null;
  isVisible: boolean;
  onClick: () => void;
}

interface VillageGalleryProps {
  language?: string;
}

// Lazy Image Component
const LazyImage: React.FC<LazyImageProps> = React.memo(
  ({ src, alt, className, priority = false }) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = src;
    }, [src]);

    if (imageError) {
      const index = src.match(/img(\d+)/)?.[1] || '1';
      const svgContent = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#667eea;stop-opacity:1"/><stop offset="100%" style="stop-color:#764ba2;stop-opacity:1"/></linearGradient></defs><rect width="400" height="300" fill="url(#grad${index})"/><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="500">${alt}</text></svg>`;
      const fallbackSrc = `data:image/svg+xml;base64,${btoa(svgContent)}`;

      return <img src={fallbackSrc} alt={alt} className={className} />;
    }

    return (
      <>
        {!imageLoaded && <div className={`${className} shimmer-placeholder`} />}
        <img
          src={src}
          alt={alt}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          style={{ transition: 'opacity 0.2s ease-in-out' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      </>
    );
  }
);

LazyImage.displayName = 'LazyImage';

// Gallery Item Component
const GalleryItem: React.FC<GalleryItemProps> = React.memo(
  ({ item, idx, image, observer, isVisible, onClick }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState<boolean>(false);
    const isPriority = item.index < 4;

    useEffect(() => {
      if (isPriority) {
        setShouldLoad(true);
        return;
      }

      const element = elementRef.current;
      if (element && observer) {
        element.setAttribute('data-image-index', item.index.toString());
        observer.observe(element);

        return () => {
          if (observer) observer.unobserve(element);
        };
      }
    }, [item.index, observer, isPriority]);

    useEffect(() => {
      if (isVisible || isPriority) setShouldLoad(true);
    }, [isVisible, isPriority]);

    if (!image) return null;

    const itemStyle: React.CSSProperties = {
      gridArea: item.gridArea,
      animationDelay: `${idx * 0.05}s`,
    };

    return (
      <div
        ref={elementRef}
        className="gallery-item bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-orange-200 group relative opacity-0 animate-fade-in transition-all duration-300"
        style={itemStyle}
        onClick={onClick}
      >
        {shouldLoad ? (
          <LazyImage
            src={image.src}
            alt={image.alt}
            className="gallery-image w-full h-full object-cover"
            priority={isPriority}
          />
        ) : (
          <div className="gallery-image w-full h-full shimmer-placeholder" />
        )}
        <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold text-sm">{image.title}</h3>
          </div>
        </div>
      </div>
    );
  }
);

GalleryItem.displayName = 'GalleryItem';

const Gallery: React.FC<VillageGalleryProps> = ({ language = 'en' }) => {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(
    null
  );

  const content = {
    en: {
      title: 'Village Gallery',
      subtitle: 'Discover our collection of stunning visuals',
      instruction: 'Hover over any image to see it in full detail',
      mobileInstruction: 'Tap any image to see it in full detail',
    },
    mr: {
      title: 'गाव गॅलरी',
      subtitle: 'आमच्या सुंदर गावाची आणि सामुदायिक जीवनाची झलक',
      instruction: 'संपूर्ण तपशीलात पाहण्यासाठी कोणत्याही प्रतिमेवर होव्हर करा',
      mobileInstruction:
        'संपूर्ण तपशीलात पाहण्यासाठी कोणत्याही प्रतिमेवर टॅप करा',
    },
  };

  const t = content[language as keyof typeof content] || content.en;

  // Memoize static image data - village gallery images (first 8)
  const imageData = useMemo<ImageData[]>(
    () => [
      {
        id: 1,
        src: grampanchayatImg,
        alt: 'Village Market',
        title: 'GramPanchayat',
      },
      {
        id: 2,
        src: GateImg,
        alt: 'Traditional Houses',
        title: 'Main Gate',
      },
      {
        id: 3,
        src: zpImg,
        alt: 'Agricultural Fields',
        title: 'ZP School',
      },
      {
        id: 5,
        src: templeImg,
        alt: 'Village Temple',
        title: 'Hanuman Mandir',
      },
     
      
      {
        id: 9,
        src: event1Img,
        alt: 'Cultural Heritage',
        title: 'f',
      },
      {
        id: 10,
        src: event2Img,
        alt: 'Cultural Heritage',
        title: 'f',
      },
      {
        id: 11,
        src: event3Img,
        alt: 'Cultural Heritage',
        title: 'f',
      },
      {
        id: 12,
        src: event4Img,
        alt: 'Cultural Heritage',
        title: 'f',
      },
    ],
    []
  );

  // Mobile grid layout - 5 sections
  const mobileGridItems = useMemo<GridItem[]>(
    () => [
      { gridArea: '1 / 1 / 2 / 3', index: 0 },
      { gridArea: '2 / 1 / 3 / 2', index: 1 },
      { gridArea: '2 / 2 / 3 / 3', index: 2 },
      { gridArea: '3 / 1 / 4 / 2', index: 3 },
      { gridArea: '3 / 2 / 4 / 3', index: 4 },
      { gridArea: '4 / 1 / 5 / 2', index: 5 }, // new row for image 6
      { gridArea: '4 / 2 / 5 / 3', index: 6 }, // new row for image 7
      { gridArea: '5 / 1 / 6 / 2', index: 7 }, // new row for image 8
      { gridArea: '5 / 2 / 6 / 3', index: 8 }, // new row for image 9
      // Add more as needed
    ],
    []
  );

  // Desktop grid layout - 8 sections (3x3 grid with some spanning)
  const desktopGridItems = useMemo<GridItem[]>(
    () => [
      // Row 1
      { gridArea: '1 / 1 / 3 / 3', index: 0 }, // Large image spanning 2x2
      { gridArea: '1 / 3 / 2 / 4', index: 1 },
      { gridArea: '1 / 4 / 2 / 5', index: 2 },
      // Row 2
      { gridArea: '2 / 3 / 3 / 4', index: 3 },
      { gridArea: '2 / 4 / 3 / 5', index: 4 },
      // Row 3
      { gridArea: '3 / 1 / 4 / 2', index: 5 },
      { gridArea: '3 / 2 / 4 / 3', index: 6 },
      { gridArea: '3 / 3 / 4 / 4', index: 7 },
      { gridArea: '3 / 4 / 4 / 5', index: 8 }, // new column for image 9
      // Add more as needed
    ],
    []
  );

  // Intersection Observer callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imageIndex = parseInt(
            entry.target.getAttribute('data-image-index') || '0'
          );
          setVisibleImages((prev) => new Set([...prev, imageIndex]));
        }
      });
    },
    []
  );

  // Intersection Observer setup
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    });

    // Load first 4 images immediately
    setVisibleImages(new Set([0, 1, 2, 3]));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  return (
    <section id="gallery" className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 opacity-0 animate-fade-in-up">
            {t.title}
          </h2>
          <p className="text-gray-600 opacity-0 animate-fade-in-up-delay">
            {t.subtitle}
          </p>
        </div>

        {/* Mobile Layout - 5 sections - FIXED */}
        <div className="block md:hidden overflow-hidden">
          <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[500px] w-full relative opacity-0 animate-fade-in-scale transition-all duration-400 ease-out overflow-hidden">
            {mobileGridItems.map((item, idx) => (
              <GalleryItem
                key={`mobile-gallery-${item.index}-${idx}`}
                item={item}
                idx={idx}
                image={imageData[item.index]}
                observer={observerRef.current}
                isVisible={visibleImages.has(item.index)}
                onClick={() => setFullscreenImage(imageData[item.index])}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout - 8 sections */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[500px] w-full relative opacity-0 animate-fade-in-scale transition-all duration-400 ease-out">
            {desktopGridItems.map((item, idx) => (
              <GalleryItem
                key={`desktop-gallery-${item.index}-${idx}`}
                item={item}
                idx={idx}
                image={imageData[item.index]}
                observer={observerRef.current}
                isVisible={visibleImages.has(item.index)}
                onClick={() => setFullscreenImage(imageData[item.index])}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 opacity-0 animate-fade-in-up-delay-2">
          <p className="text-gray-500 text-xs md:text-sm">
            <span className="block md:hidden">{t.mobileInstruction}</span>
            <span className="hidden md:block">{t.instruction}</span>
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative bg-white rounded-xl shadow-xl max-w-[95vw] max-h-[85vh] overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl font-bold hover:text-blue-900 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md"
              onClick={() => setFullscreenImage(null)}
            >
              ✖
            </button>
            <img
              src={fullscreenImage.src}
              alt="Selected"
              className="block w-auto h-auto max-w-[95vw] max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;