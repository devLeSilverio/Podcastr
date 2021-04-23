 // SPA --> useEffect(()=>{}, []) o array vazio faz o useEffecct ser disparado uma unica vez assim que o componente for exibido em tela 
//SSR --> recarrega toda vez que a cessar a home da aplicação , mas se ela na sofre alteração, nao tem porque ir na api e buscra os episodios
//SSG --> asssim que entra na pag, a aplicacao que noa muda fica estatica  

export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>  
    </div>
  )
}

export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props:{
      episodes:data,
    },
    revalidate: 60*60*8,
  }
}
