import { useState } from 'react';
import styles from './CreatePost.module.css'
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthContext();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());
    console.log(tagsArray)

    if(!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos.');
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate("/");
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input 
            type="text" 
            name='title' 
            required
            placeholder='Pense em um bom título...' 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
          />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input 
            type="text" 
            name='url' 
            required 
            placeholder='Insira uma imagem que represente seu post...' 
            onChange={(e) => setImage(e.target.value)} 
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name='body' 
            required 
            placeholder='Insira o conteúdo do post...' 
            onChange={(e) => setBody(e.target.value)} 
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name='tags' 
            required 
            placeholder='Insira as tags separadas por vírgula...' 
            onChange={(e) => setTags(e.target.value)} 
            value={tags}
          />
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && (
          <button className='btn' disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
