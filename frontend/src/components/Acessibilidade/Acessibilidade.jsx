import './Acessibilidade.css';
import { VscColorMode } from "react-icons/vsc";
import { MdOutlineInvertColors } from "react-icons/md";
import { useEffect } from 'react';

function Acessibilidade({ isOpen }) {
    useEffect(() => {
        // Carregar configurações salvas do localStorage
        const savedFontSize = localStorage.getItem('fontSize');
        const savedContrast = localStorage.getItem('contrast');
        const savedFontFamily = localStorage.getItem('fontFamily');
        const savedSaturation = localStorage.getItem('saturation');

        if (savedFontSize) {
            document.documentElement.style.fontSize = savedFontSize;
        }
        if (savedContrast) {
            document.documentElement.style.filter = savedContrast;
        }
        if (savedFontFamily) {
            document.documentElement.style.fontFamily = savedFontFamily;
        }
        if (savedSaturation) {
            document.documentElement.style.filter = savedSaturation;
        }

        const handleFontSizeChange = (level) => {
            let fontSize;
            switch (level) {
                case 1:
                    fontSize = '14px';
                    break;
                case 2:
                    fontSize = '16px';
                    break;
                case 3:
                    fontSize = '18px';
                    break;
                default:
                    fontSize = '14px';
            }
            document.documentElement.style.fontSize = fontSize;
            localStorage.setItem('fontSize', fontSize);
        };

        const handleContrastChange = (level) => {
            let contrast;
            switch (level) {
                case 1:
                    contrast = 'contrast(100%)';
                    break;
                case 2:
                    contrast = 'contrast(150%)';
                    break;
                case 3:
                    contrast = 'contrast(200%)';
                    break;
                default:
                    contrast = 'contrast(100%)';
            }
            document.documentElement.style.filter = contrast;
            localStorage.setItem('contrast', contrast);
        };

        const handleFontChange = (level) => {
            let fontFamily;
            switch (level) {
                case 1:
                    fontFamily = 'Afacad, sans-serif';
                    break;
                case 2:
                    fontFamily = 'Georgia, serif';
                    break;
                case 3:
                    fontFamily = 'Courier New, monospace';
                    break;
                default:
                    fontFamily = 'Afacad, sans-serif';
            }
            document.documentElement.style.fontFamily = fontFamily;
            localStorage.setItem('fontFamily', fontFamily);
        };

        const handleSaturationChange = (level) => {
            let saturation;
            switch (level) {
                case 1:
                    saturation = 'saturate(100%)';
                    break;
                case 2:
                    saturation = 'saturate(150%)';
                    break;
                case 3:
                    saturation = 'saturate(200%)';
                    break;
                default:
                    saturation = 'saturate(100%)';
            }
            document.documentElement.style.filter = saturation;
            localStorage.setItem('saturation', saturation);
        };

        document.querySelectorAll('.tamanho-fonte .level-1').forEach(button => button.addEventListener('click', () => handleFontSizeChange(1)));
        document.querySelectorAll('.tamanho-fonte .level-2').forEach(button => button.addEventListener('click', () => handleFontSizeChange(2)));
        document.querySelectorAll('.tamanho-fonte .level-3').forEach(button => button.addEventListener('click', () => handleFontSizeChange(3)));

        document.querySelectorAll('.contraste .level-1').forEach(button => button.addEventListener('click', () => handleContrastChange(1)));
        document.querySelectorAll('.contraste .level-2').forEach(button => button.addEventListener('click', () => handleContrastChange(2)));
        document.querySelectorAll('.contraste .level-3').forEach(button => button.addEventListener('click', () => handleContrastChange(3)));

        document.querySelectorAll('.fonte .level-1').forEach(button => button.addEventListener('click', () => handleFontChange(1)));
        document.querySelectorAll('.fonte .level-2').forEach(button => button.addEventListener('click', () => handleFontChange(2)));
        document.querySelectorAll('.fonte .level-3').forEach(button => button.addEventListener('click', () => handleFontChange(3)));

        document.querySelectorAll('.saturacao .level-1').forEach(button => button.addEventListener('click', () => handleSaturationChange(1)));
        document.querySelectorAll('.saturacao .level-2').forEach(button => button.addEventListener('click', () => handleSaturationChange(2)));
        document.querySelectorAll('.saturacao .level-3').forEach(button => button.addEventListener('click', () => handleSaturationChange(3)));

        return () => {
            document.querySelectorAll('.tamanho-fonte .level-1').forEach(button => button.removeEventListener('click', handleFontSizeChange));
            document.querySelectorAll('.tamanho-fonte .level-2').forEach(button => button.removeEventListener('click', handleFontSizeChange));
            document.querySelectorAll('.tamanho-fonte .level-3').forEach(button => button.removeEventListener('click', handleFontSizeChange));

            document.querySelectorAll('.contraste .level-1').forEach(button => button.removeEventListener('click', handleContrastChange));
            document.querySelectorAll('.contraste .level-2').forEach(button => button.removeEventListener('click', handleContrastChange));
            document.querySelectorAll('.contraste .level-3').forEach(button => button.removeEventListener('click', handleContrastChange));

            document.querySelectorAll('.fonte .level-1').forEach(button => button.removeEventListener('click', handleFontChange));
            document.querySelectorAll('.fonte .level-2').forEach(button => button.removeEventListener('click', handleFontChange));
            document.querySelectorAll('.fonte .level-3').forEach(button => button.removeEventListener('click', handleFontChange));

            document.querySelectorAll('.saturacao .level-1').forEach(button => button.removeEventListener('click', handleSaturationChange));
            document.querySelectorAll('.saturacao .level-2').forEach(button => button.removeEventListener('click', handleSaturationChange));
            document.querySelectorAll('.saturacao .level-3').forEach(button => button.removeEventListener('click', handleSaturationChange));
        };
    }, []);

    return (
        <div className={`popup-acess ${isOpen ? 'open' : ''}`}>
            <h3 className='title'>Acessibilidade</h3>
            <div className="boxes-container">
                <div className="column-left">
                    <div className="box tamanho-fonte">
                        <p className='text-icon'>A+</p>
                        <p className='title-box'>Tamanho da fonte</p>
                        <p className='nivel'>Padrão</p>
                        <div className="level-container">
                            <button className='level-1' />
                            <button className='level-2' />
                            <button className='level-3' />
                        </div>
                    </div>
                    <div className="box contraste">
                        <VscColorMode size={25} style={{ marginTop: '10px' }} />
                        <p className='title-box'>Contraste de cores</p>
                        <p className='nivel'>Padrão</p>
                        <div className="level-container">
                            <button className='level-1' />
                            <button className='level-2' />
                            <button className='level-3' />
                        </div>
                    </div>
                </div>
                <div className="column-right">
                    <div className="box fonte">
                        <p className='text-icon'>Aa</p>
                        <p className='title-box'>Fonte</p>
                        <p className='nivel'>Padrão</p>
                        <div className="level-container">
                            <button className='level-1' />
                            <button className='level-2' />
                            <button className='level-3' />
                        </div>
                    </div>
                    <div className="box saturacao">
                        <MdOutlineInvertColors size={30} style={{ marginTop: '10px', marginBottom: '0px' }} />
                        <p className='title-box'>Saturação</p>
                        <p className='nivel'>Padrão</p>
                        <div className="level-container">
                            <button className='level-1' />
                            <button className='level-2' />
                            <button className='level-3' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Acessibilidade;