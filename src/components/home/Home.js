import React, { useEffect, useState, useRef } from 'react';
import '../../main.css';
import Axios from 'axios';
import axios from 'axios';

//Variáveis que vão receber os dados do author //
let author = '';
let description = '';
let avatar = '';

function Home() {

    //Linhas de códigos que são usadas para fazer com que ao usuário clicar no card ele seja direcionado para a postagem automaticamnete//
    const post = useRef(null);

    function handlScroll() {
        post.current.scrollIntoView();
    }

    //

    //Linhas de código abaixo criadas para fazer requisão da API para pegar o conteúdo que vai ser mostrado em tela ao usuário clicar no link do card//
    const [slug, setSlug] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        if (slug == '') {
            return;
        }

        else {
            Axios.get(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=${slug}`).then((response) => {
                setData(response.data)
            });

        }
    }, [slug])

    //

    useEffect(() => {
        Axios.get('https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=wordpress-escolha-site-pequenas-empresas').then((response) => {
            setData(response.data)
        })
    }, [])


    //Estado criado para receber o resposta da api//
    const [blogs, setBlogs] = useState([]);
    //

    //Variável criada para usar o elemento main como referência para quando o usuário clicar no botão carregar mais a página role para o início //
    const top = useRef(null);

    function handleLeft() {
        top.current.scrollIntoView()
    }
    //

    //Variável responsavel por contar em qual posição está o indice da array//
    let i = 0;
    //
    //Estado criado para ouvir quando se é clicado o botâo carregar mais//
    const [pages, setPages] = useState(1);
    //

    useEffect(() => {
        Axios.get(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518&page=${pages}`).then((response) => {

            setBlogs(response.data);

        })
    }, [pages])

    const [showButton, setShowButton] = useState(false);
    const [displayButton, setDisplayButton] = useState('block');
    const [displayButtonBack, setDisplayButtonBack] = useState('none');

    useEffect(() => {
        setDisplayButton(showButton && pages == 17 ? 'none' : 'block');
        setDisplayButtonBack(pages == 1 ? 'none' : 'block');
    }, [showButton, pages])
    return (
        <div className='center' ref={top}>
            <h3 className='page'>Página {pages}</h3>
            <h2 className='title'>Apiki Blog para Devs</h2>

            {blogs.map((item) => {
                i += 1;

                if (!author) {
                    author = item._embedded.author[0].name;
                }

                if (!description) {
                    description = item._embedded.author[0].description;
                }

                if (!avatar) {
                    avatar = item._embedded.author[0].avatar_urls['96'];
                }

                let card = i;

                let image = ''

                // código que checa os elementos que não possuem uma imagem definida em um atributto, então é direcionado para outro atributo que possue a imagem//
                if (pages == 1 && i == 8 || pages == 2 && i == 8 || pages == 3 && i == 8 || pages == 12 && i == 7 || pages == 13 && i == 7 || pages == 14 && i == 7 || pages == 14 && i == 1 || pages == 15 && i == 1 || pages == 16 && i == 1 || pages == 17 && i == 1 || pages == 17 && i == 2 || pages == 18 && i == 1 || pages == 16 && i == 2 || pages == 16 && i == 3 || pages == 16 && i == 4) {
                    image = item.yoast_head_json.og_image[0].url;
                }
                //

                else {
                    image = item._embedded["wp:featuredmedia"][0].source_url;
                }

                return (
                    <div className='card' key={item.id}>
                        <div className='image'><img src={image} alt="image" />
                        </div>
                        <h2>{item.title.rendered}</h2>
                        <h3>Clique no link abaixo:</h3>
                        <a onClick={() => {

                            setSlug(item.slug);
                            handlScroll();

                        }}>{item.slug}</a>
                    </div>
                )

            })}

            <div className='buttons'>
                <button onClick={(e) => {
                    e.preventDefault()
                    i = 0;
                    setPages(pages => pages + 1);
                    setShowButton(true);
                    handleLeft();

                }} style={{ display: displayButton }}>Carregar mais...</button>

                <button onClick={(e) => {
                    e.preventDefault();
                    i = 0;
                    setPages(pages => pages - 1);
                    handleLeft();

                }} style={{ display: displayButtonBack }}>Voltar</button>
            </div>

            <div className='Author'>
                <div className='avatar'>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className='container'>
                    <h3>{author}</h3>
                    <p>{description}</p>
                </div>

            </div>
            <h3 className='page'>Página {pages}</h3>

            <div ref={post}></div>
            {

                // Códigos abaixo para renderizar em tela o resultado da postagem que o usuário clicou
                data.map((item) => {
                    let text = item.content.rendered;
                    text = text.replace(/(<([^>]+)>)/ig, '');
                    return (
                        <div className='post' key={item.id}>
                            <img src={item.yoast_head_json.og_image[0].url} alt="post" />
                            <h2>{item.title.rendered}</h2>
                            <h3>{item.yoast_head_json.description}</h3>
                            <p>{text}</p>
                        </div>
                    );
                })
                //
            }

        </div >

    );
}

export default Home;