import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProfileMenu from '../../components/Profile-menu/Profile-menu';
import { FaRegTrashCan } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import AdicionarPublicacao from './AdicionarPublicacao';
import './EditarPublicacao.css';

function EditarPublicacao() {
    const [publications, setPublications] = useState([]);
    const [editPublication, setEditPublication] = useState(null);
    const [previas, setPrevias] = useState([null, null, null, null]);
    const [showPopup, setShowPopup] = useState(false);

    const fetchPublications = async () => {
        const token = localStorage.getItem('acessToken');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        console.log('Token de autenticação:', token); // Log do token

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/publications`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Resposta da requisição:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Publicações do perfil:', data);
                setPublications(data);
            } else {
                console.error('Erro ao buscar publicações:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar publicações', error);
        }
    };

    useEffect(() => {
        fetchPublications();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('acessToken');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/publications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Publicação deletada com sucesso');
                fetchPublications();
            } else {
                console.error('Erro ao deletar publicação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar publicação', error);
        }
    };

    const handleEdit = async (id) => {
        const token = localStorage.getItem('acessToken');
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const formData = new FormData();
        formData.append('content', editPublication.content);
        editPublication.images.forEach((image, index) => {
            if (image instanceof File) {
                formData.append(`imageUrl${index + 1}`, image);
            }
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/publications/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                console.log('Publicação editada com sucesso');
                fetchPublications();
                setEditPublication(null);
                setPrevias([null, null, null, null]);
                setShowPopup(false);
            } else {
                console.error('Erro ao editar publicação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao editar publicação', error);
        }
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const novasImagens = [...editPublication.images];
                novasImagens[index] = file;
                setEditPublication({ ...editPublication, images: novasImagens });

                const novasPrevias = [...previas];
                novasPrevias[index] = reader.result;
                setPrevias(novasPrevias);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const novasImagens = [...editPublication.images];
        novasImagens.splice(index, 1);
        setEditPublication({ ...editPublication, images: novasImagens });

        const novasPrevias = [...previas];
        novasPrevias.splice(index, 1);
        setPrevias(novasPrevias);
    };

    const openEditPopup = (publication) => {
        setEditPublication({ ...publication, images: publication.images || [] });
        setPrevias([
            publication.imageUrl1 || null,
            publication.imageUrl2 || null,
            publication.imageUrl3 || null,
            publication.imageUrl4 || null
        ]);
        setShowPopup(true);
    };

    const handleAddPublication = (newPublication) => {
        fetchPublications();
    };

    return (
        <div>
            <Navbar />
            <ProfileMenu />
            <AdicionarPublicacao onAdd={handleAddPublication} />

            <h1 className='h1-publication'>Editar Publicações</h1>
            <div className="container-publicacoes">
                {publications.map((publication) => (
                    <div key={publication.PublicationId} className="publicacao">
                        <p>{publication.content}</p>
                        <div className='images-edit'>
                            {publication.imageUrl1 && <img src={publication.imageUrl1} alt="Imagem 1" />}
                            {publication.imageUrl2 && <img src={publication.imageUrl2} alt="Imagem 2" />}
                            {publication.imageUrl3 && <img src={publication.imageUrl3} alt="Imagem 3" />}
                            {publication.imageUrl4 && <img src={publication.imageUrl4} alt="Imagem 4" />}
                        </div>
                        <div className='edit-options'>
                            <div className='excloi' onClick={() => handleDelete(publication.PublicationId)}>
                                <FaRegTrashCan  />
                                <p>Excluir</p>
                            </div>
                            <div className='edith' onClick={() => openEditPopup(publication)}>
                                <RiPencilFill  />
                                <p>Editar</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="popup-edit-publication">
                    <div className="popup-content">
                        <div>
                            <h2>Editar Publicação</h2>
                            <button className="sair" onClick={() => setShowPopup(false)}>X</button>
                        </div>
                        <textarea
                            value={editPublication.content}
                            onChange={(e) => setEditPublication({ ...editPublication, content: e.target.value })}
                            placeholder="Digite o conteúdo da publicação"
                        />
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleImageChange(index, event)}
                                />
                                {previas[index] && (
                                    <div>
                                        <img src={previas[index]} alt={`Prévia ${index + 1}`} width="100" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <button className="salvar" onClick={() => handleEdit(editPublication.PublicationId)}>Salvar</button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default EditarPublicacao;