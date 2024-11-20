import { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import './AdicionarPublicacao.css';

function AdicionarPublicacao({ onAdd }) {
    const [newPublication, setNewPublication] = useState({ content: '', images: [] });
    const [previas, setPrevias] = useState([null, null, null, null]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleAdd = async () => {
        const token = localStorage.getItem('acessToken');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const formData = new FormData();
        formData.append('content', newPublication.content);
        newPublication.images.forEach((image, index) => {
            formData.append(`imageUrl${index + 1}`, image);
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/publications`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = response.headers.get('Content-Length') > 0 ? await response.json() : {};
                onAdd(data);
                setNewPublication({ content: '', images: [] });
                setPrevias([null, null, null, null]);
                console.log('Publicação adicionada com sucesso');
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    window.location.reload(); // Recarregar a página após 3 segundos
                }, 3000);
            } else {
                console.error('Erro ao adicionar publicação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao adicionar publicação', error);
        }
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const novasImagens = [...newPublication.images];
                novasImagens[index] = file;
                setNewPublication({ ...newPublication, images: novasImagens });

                const novasPrevias = [...previas];
                novasPrevias[index] = reader.result;
                setPrevias(novasPrevias);
            };
            reader.readAsDataURL(file);
        }
    };

    return (

        <div>
            <h1 className='h1-publication'>Adicionar Publicação</h1>
            <div className="add-publicacao">
            <textarea
                value={newPublication.content}
                onChange={(e) => setNewPublication({ ...newPublication, content: e.target.value })}
                placeholder="Digite o conteúdo da publicação..."
            />
            {[0, 1, 2, 3].map((index) => (
                <div className='archives' key={index}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageChange(index, event)}
                    />
                    {previas[index] && <img src={previas[index]} alt={`Prévia ${index + 1}`} width="100" />}
                </div>
            ))}
        
            <div className='add-now'>
                <IoAddCircleOutline size={22} className="add-icon" onClick={handleAdd} />
                <p onClick={handleAdd}>Adicionar</p>
            </div>
            {showSuccessPopup && (
                <div className="success-popup">
                    Publicação publicada com sucesso!
                </div>
            )}
        </div>
        </div>
    );
}

export default AdicionarPublicacao;