 // SPA --> useEffect(()=>{}, []) o array vazio faz o useEffecct ser disparado uma unica vez assim que o componente for exibido em tela 
//SSR --> recarrega toda vez que a cessar a home da aplicação , mas se ela na sofre alteração, nao tem porque ir na api e buscra os episodios
//SSG --> asssim que entra na pag, a aplicacao que noa muda fica estatica  

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from "next"
import api from "../../services/api"
import convertDurationToTimeString from '../utils/convertDurationToTimeString'

type Episode = {
  id:string;
  title:string;
  members:string;
  published_at:string;
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props : HomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>  
    </div>
  )
}

export  const getStaticProps: GetStaticProps = async () => { 
  const {data} = await api.get('episodes',{
    params:{
      _limit:12,
      _sort:'published_at',
      _order:'desc'
    }
  })

  const episodes = data.map(episode =>{
    return{
      id:episode.id,
      title:episode.title,
      thumbnail:episode.thumbnail,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR} ),
      duration:Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  })

  return {
    props: {
      episodes,
    },
    revalidate: 60*60*8,
  }
}
