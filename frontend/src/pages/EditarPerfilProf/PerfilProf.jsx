import { useState, useEffect } from 'react';
import './PerfilProf.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProfileMenu from '../../components/Profile-menu/Profile-menu';
import FotoPerfil from '../../components/FotoPerfil/FotoPerfil';
import Button from '../../components/Button/Button';
import { RiPencilFill } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";

function PerfilProf() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [professionalName, setProfessionalName] = useState('');
    const [socialMedia, setSocialMedia] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('acessToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            console.log('Token de autenticação:', token); // Log do token

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Resposta da requisição:', response);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Dados do perfil:', data);
                    setProfessionalName(data.professionalName || '');
                    setSelectedCategories(data.category ? data.category.split(' | ') : []);
                    setSocialMedia(data.socialMedia || '');
                    setAddress(data.localization || '');
                    setProfileImage(data.profilePicture || null); // Corrigir a chave para 'profilePicture'
                    setAboutMe(data.aboutMe || '');
                    setTelephone(data.telephone || '');
                    setEmail(data.email || '');
                } else {
                    console.error('Erro ao buscar perfil:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar perfil', error);
            }
        };

        fetchProfile();
    }, []);



    const handleCategorySelect = (event) => {
        const value = event.target.value;
        if (value && !selectedCategories.includes(value)) {
            setSelectedCategories([...selectedCategories, value]);
        }
    };

    const handleCategoryRemove = (category) => {
        setSelectedCategories(selectedCategories.filter(item => item !== category));
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file); // Armazenar o arquivo em vez do resultado da leitura
        }
    };

    const handleSocialMediaChange = (event) => {
        let value = event.target.value;
        if (!value.startsWith('@')) {
            value = '@' + value;
        }
        setSocialMedia(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const categoriesString = selectedCategories.join(' | ');

        const formData = new FormData();
        formData.append('profilePicture', profileImage);
        formData.append('professionalName', professionalName);
        formData.append('category', categoriesString);
        formData.append('aboutMe', aboutMe);
        formData.append('socialMedia', socialMedia);
        formData.append('localization', address);

        const token = localStorage.getItem('acessToken');

        try {
            const response = await fetch('http://localhost:8080/users/add-premium-details', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (response.ok) {
                console.log('Dados enviados com sucesso');
                window.location.reload();
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados', error);
        }
    };

    return (
        <>
            <Navbar />
            <ProfileMenu />
            <div className="edit-profile">
                <div className="form-left">
                    <form id='left' onSubmit={handleSubmit}>
                        <div className="profile-image-container" onClick={() => document.getElementById('profileImageInput').click()}>
                        <input
                            type="file"
                            id="profileImageInput"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                            <FotoPerfil isLarge="large" src={profileImage && profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage} />
                            <RiPencilFill size={20} color='#CC6700' className="edit-icon nome-usuario-icon" />
                        </div>
                        <div className="nome-container">
                            <label htmlFor="nome-usuario" id='nome-usuario'>Nome de Usuário
                                <RiPencilFill size={20} color='#CC6700' className="edit-icon nome-usuario-icon" />
                            </label>
                            <input
                                type="text"
                                className='nome-usuario'
                                placeholder='Digite seu nome'
                                value={professionalName}
                                onChange={(e) => setProfessionalName(e.target.value)}
                            />
                        </div>
                        <div className="sobre-container">
                            <label htmlFor="sobre" id='sobre'>Sobre
                                <RiPencilFill size={20} color='#CC6700' className="edit-icon nome-usuario-icon" />
                            </label>
                            <input
                                type="text"
                                className='sobre'
                                placeholder='Escreva um pouco sobre você'
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                            />
                        </div>
                        <div className="categoria-container">
                            <label htmlFor="categoria" id='categoria'>Categorias
                                <IoAddCircleOutline size={22} color='#FFF' className="add-icon"/>
                            </label>
                                <select className="categoria-select" onChange={handleCategorySelect}>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="literatura">Literatura</option>
                                    <option value="artesanato">Artesanato</option>
                                    <option value="moda">Moda</option>
                                    <option value="musica">Música</option>
                                    <option value="dança">Dança</option>
                                </select>
                            <div className="categoria">
                                {selectedCategories.map(category => (
                                    <label key={category} className='label-categoria' onClick={() => handleCategoryRemove(category)}>
                                        {category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="contato-container">
                            <label htmlFor="contato" id='contato'>Contato
                                <RiPencilFill size={20} color='#CC6700' className="edit-icon contato-edit-icon" />
                            </label>
                            <input
                                type="tel"
                                className='contato'
                                placeholder='Celular'
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                            <input
                                type="email"
                                className='contato'
                                placeholder='E-mail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                className='contato'
                                placeholder='Instagram'
                                value={socialMedia}
                                onChange={handleSocialMediaChange}
                            />
                        </div>
                        <div className="localizacao-container">
                            <label htmlFor="localizacao" id='localizacao'>Localização
                                <RiPencilFill size={20} color='#CC6700' className="edit-icon localizacao-edit-icon" />
                            </label>
                            <input
                                type="text"
                                className='localizacao'
                                placeholder='Endereço'
                                value={address}
                                onChange={handleAddressChange}
                            />
                            <br />
                            <br />
                            <Button title='Salvar' />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PerfilProf;