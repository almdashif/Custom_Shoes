import React, { useState, useEffect, useRef } from 'react';
import { useGLTF, useCursor, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Footer from './Footer';

const Shoe = ({color}) => {
    const { scene } = useGLTF('/models/shoe.glb');
    const [selectedPart, setSelectedPart] = useState(null);
    const [highlightedPart, setHighlightedPart] = useState(null); 
    const [coloredParts, setColoredParts] = useState({}); 
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const { camera } = useThree();
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouse = new THREE.Vector2();

    useCursor(true);

    const handleClick = (partName, mesh) => {
        if (!color) return; 
       
        setHighlightedPart(partName);
        setTimeout(() => setHighlightedPart(null), 2000); 

       
        const updatedColoredParts = { ...coloredParts, [partName]: color };
        setColoredParts(updatedColoredParts);

        mesh.material = mesh.material.clone(); 
        mesh.material.color.set(color); 
    };

    useEffect(() => {
        if (selectedPart) {
            scene.traverse((child) => {
                if (child.isMesh && child.name === selectedPart && coloredParts[selectedPart]) {
                    child.material.color.set(coloredParts[selectedPart]);
                }
            });
        }
    }, [coloredParts, selectedPart, scene]);

    const handlePointerDown = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycasterRef.current.setFromCamera(mouse, camera);
        const intersects = raycasterRef.current.intersectObject(scene, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            const partName = clickedObject.name;
            setSelectedPart(partName); // Set selected part
            handleClick(partName, clickedObject); // Apply color to the part
        }

        setDragStart({ x: event.clientX, y: event.clientY });
        setIsDragging(true);
    };

    const handlePointerMove = (event) => {
        if (!isDragging) return;

        const dx = event.clientX - dragStart.x;
        const dy = event.clientY - dragStart.y;

        // Update the model position or rotation based on mouse drag
        scene.position.x += dx * 0.01;
        scene.position.y -= dy * 0.01;

        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseup', handlePointerUp);

        return () => {
            window.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
        };
    }, [camera, color, isDragging, dragStart]);

    return (
        <primitive object={scene} scale={0.5} />
    );
};

export default Shoe;
