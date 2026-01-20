import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projectsRow1 = [
    {
        id: 1,
        title: "Project One",
        description: "High-conversion animated website.",
        image: "https://placehold.co/600x400/262626/E3FB29/png?text=Project+One",
        hoverType: "scale-glow"
    },
    {
        id: 2,
        title: "Project Two",
        description: "Interactive product experience.",
        image: "https://placehold.co/600x400/262626/E3FB29/png?text=Project+Two",
        hoverType: "scale-glow"
    }
];

const projectsRow2 = [
    {
        id: 3,
        title: "Project Three",
        description: "SaaS dashboard with motion.",
        image: "https://placehold.co/600x400/262626/E3FB29/png?text=Project+Three",
        hoverType: "tilt-glow"
    },
    {
        id: 4,
        title: "Project Four",
        description: "Brand-focused portfolio site.",
        image: "https://placehold.co/600x400/262626/E3FB29/png?text=Project+Four",
        hoverType: "tilt-glow"
    }
];

const ProjectCard = ({ project, index, rowType }) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    const handleMouseEnter = () => {
        if (project.hoverType === "scale-glow") {
            gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out", boxShadow: "0 0 30px rgba(227, 251, 41, 0.3)" });
            gsap.to(cardRef.current, { borderColor: "#E3FB29", duration: 0.3 });
        } else if (project.hoverType === "tilt-glow") {
            gsap.to(cardRef.current, { rotationZ: index % 2 === 0 ? -2 : 2, scale: 1.02, duration: 0.3, ease: "power2.out", boxShadow: "0 0 30px rgba(227, 251, 41, 0.3)" });
        }
    };

    const handleMouseLeave = () => {
        if (project.hoverType === "scale-glow") {
            gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "none" });
            gsap.to(cardRef.current, { borderColor: "transparent", duration: 0.3 });
        } else if (project.hoverType === "tilt-glow") {
            gsap.to(cardRef.current, { rotationZ: 0, scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "none" });
        }
    };

    return (
        <div
            ref={cardRef}
            className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="aspect-video overflow-hidden">
                <img
                    ref={imageRef}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 transform">
                    {project.title}
                </h3>
                <p className="text-text-secondary font-body translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform">
                    {project.description}
                </p>
            </div>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Row 1 Animation: Reveal Stagger
            gsap.from(row1Ref.current.children, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: row1Ref.current,
                    start: "top 80%",
                }
            });

            // Row 2 Animation: Fade Up Stagger
            gsap.from(row2Ref.current.children, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: row2Ref.current,
                    start: "top 80%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 md:px-10 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col gap-20">

                {/* Row 1 */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl font-heading font-bold text-white mb-4">Featured <span className="text-primary opacity-80">Work</span></h2>
                    <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projectsRow1.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} rowType={1} />
                        ))}
                    </div>
                </div>

                {/* Row 2 */}
                <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                    {projectsRow2.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} rowType={2} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Projects;
