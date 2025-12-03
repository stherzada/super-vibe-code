'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mountNode = mountRef.current;
        if (!mountNode) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.03);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountNode.appendChild(renderer.domElement);

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = isMobile ? 800 : isTablet ? 1200 : 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3)
        );
        const particlesMaterial = new THREE.PointsMaterial({
            size: isMobile ? 0.025 : 0.02,
            color: 0x888888,
            transparent: true,
            opacity: 0.5,
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        const geometry = new THREE.IcosahedronGeometry(1.5, isMobile ? 0 : 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.1,
            metalness: 0.8,
            wireframe: true,
        });
        const mainShape = new THREE.Mesh(geometry, material);
        scene.add(mainShape);

        const innerGeo = new THREE.IcosahedronGeometry(1.2, isMobile ? 0 : 1);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x4f46e5,
            wireframe: true,
            transparent: true,
            opacity: 0.2,
        });
        const innerShape = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerShape);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x6366f1, 2);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-2, -3, 4);
        scene.add(pointLight2);

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();
        let animationId: number;

        const animate = () => {
            mainShape.rotation.y += 0.003;
            mainShape.rotation.x += 0.002;
            innerShape.rotation.y -= 0.005;

            const parallaxStrength = isMobile ? 0.3 : 0.5;
            particlesMesh.rotation.y = -mouseX * parallaxStrength;
            particlesMesh.rotation.x = -mouseY * parallaxStrength;

            mainShape.rotation.y += mouseX * 0.05;
            mainShape.rotation.x += mouseY * 0.05;

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        const ctx = gsap.context(() => {
            gsap.to(mainShape.rotation, {
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2,
                },
                x: Math.PI * 2,
                y: Math.PI * 2,
            });

            gsap.to(camera.position, {
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2,
                },
                z: 2,
            });
        });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);

            geometry.dispose();
            material.dispose();
            innerGeo.dispose();
            innerMat.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();

            ctx.revert();

            if (mountNode && renderer.domElement) {
                mountNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} id="canvas-container" />;
}
