import React from 'react';

const Footer = ({ setColor, currentColor }) => {
    return (
        <div style={footerContainerStyles}>
            <div style={footerStyles}>
                <div style={colorOptionsStyles}>
                    {[
                        '#ff0000', '#00ff00', '#0000ff', '#ffff00',
                        '#ff00ff', '#00ffff', '#ff4500', '#32cd32',
                        '#8a2be2', '#f0e68c', '#ffffff',
                    ].map((colorOption) => (
                        <button
                            key={colorOption}
                            style={{
                                ...colorButtonStyles,
                                backgroundColor: colorOption,
                                outline: currentColor === colorOption ? '2px solid white' : 'none',
                            }}
                            onClick={() => setColor(colorOption)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Footer Container style (Fixed at the bottom of the viewport)
const footerContainerStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100vw',
    zIndex: 9999,
    pointerEvents: 'none', // UI interaction should not block the model
};

// Footer styles for the color options
const footerStyles = {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    textAlign: 'center',
    padding: '.5rem',
    borderRadius: '10px',
    overflow: 'hidden',
    pointerEvents: 'auto', // Allow interaction with the color options
};

const colorOptionsStyles = {
    display: 'flex',
    justifyContent: 'center',
};

const colorButtonStyles = {
    width: '100%',
    height: '50px',
    border: 'none',
    borderRadius: '0',
    cursor: 'pointer',
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
};

export default Footer;
