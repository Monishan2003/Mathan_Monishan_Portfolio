import React, { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code snippets and symbols
    const codeElements = [
      '{ }', 'const', 'function', '() =>', 'import', 'export', 
      '<div>', '</div>', 'class', 'async', 'await', 'return',
      'if', 'else', 'for', 'while', 'let', 'var', 'console.log',
      'React', 'Node.js', 'C#', 'Python', 'JavaScript', 'HTML', 'CSS'
    ];

    // Tech icons (simplified as text)
    const techIcons = ['</>', '{ }', '{}', '[]', '()', '=>', '++', '--', '==', '!='];

    // Particles array
    const particles = [];
    const maxParticles = 40;

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = Math.random() * 1.5 + 0.3;
        this.size = Math.random() * 12 + 8;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.text = Math.random() > 0.6 
          ? codeElements[Math.floor(Math.random() * codeElements.length)]
          : techIcons[Math.floor(Math.random() * techIcons.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        this.x += Math.sin(this.y * 0.01) * 0.5; // Gentle horizontal movement

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        
        // Use gradient for better visual effect
        const gradient = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
        gradient.addColorStop(0, '#2b3fa7');
        gradient.addColorStop(1, '#14b1ff');
        ctx.fillStyle = gradient;
        
        ctx.font = `bold ${this.size}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    // Create particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="background-animation"
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation;

