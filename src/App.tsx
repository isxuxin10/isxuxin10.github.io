import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { photoCollections, type Photo, type PhotoCollection } from './data/photos'

gsap.registerPlugin(ScrollTrigger)

type SelectedPhoto = { photo: Photo; collection: PhotoCollection; index: number }

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<SelectedPhoto | null>(null)
  const [activeCollection, setActiveCollection] = useState('landscapes')
  const [imageErrors, setImageErrors] = useState<string[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.fromTo('.hero-copy > .eyebrow, .hero-copy > .hero-name, .hero-copy > .hero-description', { y: 16, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.15,
      })
      gsap.fromTo('.hero h1', { y: 28, opacity: 0, clipPath: 'inset(0 0 12% 0)' }, {
        y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.15, ease: 'power3.out', delay: 0.12,
      })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 36, opacity: 0, clipPath: 'inset(8% 0 8% 0)' }, {
          y: 0, opacity: 1, clipPath: 'inset(0% 0 0% 0)', duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.series-heading').forEach((element) => {
        gsap.fromTo(element, { y: 26, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 85%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowRight') movePhoto(1)
      if (event.key === 'ArrowLeft') movePhoto(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
    // movePhoto intentionally uses the selected item captured when viewer opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const movePhoto = useCallback((direction: number) => {
    setSelected((current) => {
      if (!current) return current
      const photos = current.collection.photos
      const nextIndex = (current.index + direction + photos.length) % photos.length
      return { photo: photos[nextIndex], collection: current.collection, index: nextIndex }
    })
  }, [])

  const openPhoto = (photo: Photo, collection: PhotoCollection, index: number) => {
    setSelected({ photo, collection, index })
  }

  const markImageError = (id: string) => setImageErrors((current) => current.includes(id) ? current : [...current, id])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="site-shell" ref={root}>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Notes on the World home">NOTES ON THE WORLD<span>©</span></a>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollTo('work')}>WORK</button>
          <button onClick={() => scrollTo('about')}>ABOUT</button>
          <button onClick={() => scrollTo('contact')}>CONTACT <ArrowUpRight size={12} strokeWidth={1.5} /></button>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="Introduction">
          <div className="hero-copy">
            <p className="eyebrow">A PHOTOGRAPHY JOURNAL</p>
            <h1>Notes<br /><span className="title-middle">on the</span> <span className="title-world">World</span></h1>
            <p className="hero-name">XU XIN <span>— PHOTOGRAPHY & VISUAL NOTES</span></p>
          </div>
          <div className="hero-series-index" aria-label="Explore the three photography series">
            <a href="#landscapes"><span className="cover-series-number">01</span><span className="cover-series-title">Of Mountains, Streams,<br />Rivers & Seas</span><ArrowUpRight size={16} strokeWidth={1.4} /></a>
            <a href="#botanical"><span className="cover-series-number">02</span><span className="cover-series-title">Of Trees, Leaves,<br />Blossoms & Grass</span><ArrowUpRight size={16} strokeWidth={1.4} /></a>
            <a href="#urban"><span className="cover-series-number">03</span><span className="cover-series-title">Of Towers, Terraces,<br />Shops, Streets</span><ArrowUpRight size={16} strokeWidth={1.4} /></a>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo('work')}><span>SCROLL TO EXPLORE</span><ArrowDown size={14} strokeWidth={1.4} /></button>
          <span className="hero-index">A PERSONAL VISUAL JOURNAL</span>
        </section>

        <section className="work-intro" id="work">
          <div className="section-kicker"><span>SELECTED WORK</span><span>THREE WAYS OF SEEING</span></div>
          <p className="intro-statement">The world, noticed<br />in passing <em>and in stillness.</em></p>
        </section>

        {photoCollections.map((collection, collectionIndex) => (
          <section className={`series series-${collection.id}`} id={collection.id} key={collection.id}>
            <div className="series-heading">
              <span className="series-number">0{collectionIndex + 1} / 03</span>
              <h2>{collection.title}</h2>
              <span className="series-rule" />
            </div>
            <div className={`gallery gallery-${collection.id}`}>
              {collection.photos.map((photo, index) => (
                <button
                  className={`photo-card photo-${photo.layout ?? 'landscape'} photo-${collection.id}-${index + 1} ${index === 0 ? 'reveal' : 'reveal'}`}
                  key={photo.id}
                  onClick={() => openPhoto(photo, collection, index)}
                  aria-label={`Open photograph ${index + 1} in ${collection.title}`}
                  onMouseEnter={(event) => {
                    const image = event.currentTarget.querySelector('img')
                    if (image && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.to(image, { scale: 1.035, duration: 0.7, ease: 'power2.out' })
                  }}
                  onMouseLeave={(event) => {
                    const image = event.currentTarget.querySelector('img')
                    if (image) gsap.to(image, { scale: 1, duration: 0.7, ease: 'power2.out' })
                  }}
                >
                  {imageErrors.includes(photo.id) ? (
                    <span className="image-placeholder"><span>ADD YOUR PHOTOGRAPH</span><small>{photo.id}</small></span>
                  ) : (
                    <img src={photo.src} alt={photo.alt} loading="lazy" onError={() => markImageError(photo.id)} />
                  )}
                  <span className="photo-open" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.3} /></span>
                </button>
              ))}
            </div>
            <div className="series-end"><span>END OF SERIES 0{collectionIndex + 1}</span><button onClick={() => scrollTo(collectionIndex === 2 ? 'top' : photoCollections[collectionIndex + 1].id)}>{collectionIndex === 2 ? 'BACK TO TOP' : 'CONTINUE EXPLORING'} <ArrowDown size={12} /></button></div>
          </section>
        ))}

        <section className="about-section" id="about">
          <span className="section-label">A NOTE</span>
          <div className="about-content">
            <p className="about-title">Looking closely<br />is a way of <em>being here.</em></p>
            <p className="about-copy">A personal collection of places, details, and passing moments. Still in progress, always looking.</p>
          </div>
        </section>

        <footer className="site-footer" id="contact">
          <div className="footer-top"><span>NOTES ON THE WORLD</span><span>MADE OF MOMENTS</span></div>
          <div className="footer-main"><h2>Until the next<br /><em>somewhere.</em></h2><a className="contact-link" href="mailto:isxuxin10@163.com">ISXUXIN10@163.COM <ArrowUpRight size={16} /> <span className="contact-action">GET IN TOUCH</span></a></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} NOTES ON THE WORLD</span><button onClick={() => scrollTo('top')}>BACK TO TOP ↑</button><span>AN ONGOING VISUAL JOURNAL</span></div>
        </footer>
      </main>

      {selected && (
        <div className="viewer" role="dialog" aria-modal="true" aria-label="Photograph viewer" onClick={() => setSelected(null)}>
          <div className="viewer-top"><span>NOTES ON THE WORLD</span><button className="viewer-close" onClick={() => setSelected(null)} aria-label="Close image viewer">CLOSE <X size={16} /></button></div>
          <button className="viewer-arrow viewer-prev" aria-label="Previous photograph" onClick={(event) => { event.stopPropagation(); movePhoto(-1) }}><ArrowLeft /></button>
          <div className="viewer-image-frame" onClick={(event) => event.stopPropagation()}>
            <img key={selected.photo.id} src={selected.photo.src} alt={selected.photo.alt} />
          </div>
          <button className="viewer-arrow viewer-next" aria-label="Next photograph" onClick={(event) => { event.stopPropagation(); movePhoto(1) }}><ArrowRight /></button>
          <div className="viewer-bottom"><span>{selected.collection.title}</span><span>{String(selected.index + 1).padStart(2, '0')} / {String(selected.collection.photos.length).padStart(2, '0')}</span></div>
        </div>
      )}
    </div>
  )
}

export default App
