import React , {useEffect,useState} from 'react'
import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'
import { BaseOptionChart } from '../../components/charts'
import { useTheme, styled } from '@mui/material/styles'
import { CardHeader, Card } from '@mui/material'
import { fNumber } from '../../utils/formatNumber'
import { useLocation } from 'react-router-dom'
const FinalResult = () => {
  const location = useLocation()
  const theme = useTheme()
  const IDS = window.location.pathname.replace("/dashboard/results/","")  
  const myArray = IDS.split("/")
  const [data,setData] = useState([])
  const [voteCountOption1,setVoteCountOption1] = useState(0)
  const [voteCountOption2,setVoteCountOption2] = useState(0)
  const voteCountFunction = async  () =>{
    let voteCount = await window.contract.getVotes({
      prompt : data.mainQuestion
    })
    setVoteCountOption1(voteCount[0])
    setVoteCountOption2(voteCount[1])
  }
  useEffect(async () => {
       fetch(`http://localhost:5000/voteparty/voterparty/${myArray[1]}`).then(res=>{
      if(res.ok){
        return res.json()
    
      }
      }).then(jsonRes => setData(jsonRes))
      

  },[location.key])
  voteCountFunction()
  const CHART_HEIGHT = 372
  const LEGEND_HEIGHT = 72
  const ChartWrapperStyle = styled('div')(({ theme }) => ({
          height: CHART_HEIGHT,
          marginTop: theme.spacing(5),
          '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
          '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
            overflow: 'visible'
          },
          '& .apexcharts-legend': {
            height: LEGEND_HEIGHT,
            alignContent: 'center',
            position: 'relative !important',
            borderTop: `solid 1px ${theme.palette.divider}`,
            top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
          }
  }))
  const CHART_DATA = [voteCountOption1,voteCountOption2]
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
    ],
    labels: [data.option1,data.option2],//!!!!!!!!
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
    })

    return (
      <div>
      <h1> {data.mainQuestion} ?</h1>
      <Card>
          <CardHeader title="Result" />
          <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
          </ChartWrapperStyle>
      </Card>
      </div>
  
    )

 
}

export default FinalResult