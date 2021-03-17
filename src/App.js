import React,{useState} from 'react';

import './App.css';
import logo from './brush.svg'
import copy from './copy.svg'
import recent from "./recent.svg"
import home from "./home.svg"
import close from "./close.svg"

function App() {
  const hues = `AliceBlue:AntiqueWhite:Aqua:Aquamarine:Azure:Beige:Bisque:Black:BlanchedAlmond:Blue:BlueViolet:Brown:BurlyWood:CadetBlue:Chartreuse:Chocolate:Coral:CornflowerBlue:Cornsilk:Crimson:Cyan:DarkBlue:DarkCyan:DarkGoldenRod:DarkGrey:DarkGreen:DarkKhaki:DarkMagenta:DarkOliveGreen:DarkOrange:DarkOrchid:DarkRed:DarkSalmon:DarkSeaGreen:DarkSlateBlue:DarkSlateGray:DarkSlateGrey:DarkTurquoise:DarkViolet:DeepPink:DeepSkyBlue:DimGray:DodgerBlue:FireBrick:FloralWhite:ForestGreen:Fuchsia:Gainsboro:GhostWhite:Gold:GoldenRod:Gray:Green:GreenYellow:HoneyDew:HotPink:IndianRed:Indigo:Ivory:Khaki:Lavender:LavenderBlush:LawnGreen:LemonChiffon:LightBlue:LightCoral:LightCyan:LightGoldenRodYellow:LightGray:LightGrey:LightGreen:LightPink:LightSalmon:LightSeaGreen:LightSkyBlue:LightSlateGrey:LightSteelBlue:LightYellow:Lime:LimeGreen:Linen:Magenta:Maroon:MediumAquaMarine:MediumBlue:MediumOrchid:MediumPurple:MediumSeaGreen:MediumSlateBlue:MediumSpringGreen:MediumTurquoise:MediumVioletRed:MidnightBlue:MintCream:MistyRose:Moccasin:NavajoWhite:Navy:OldLace:Olive:OliveDrab:Orange:OrangeRed:Orchid:PaleGoldenRod:PaleGreen:PaleTurquoise:PaleVioletRed:PapayaWhip:PeachPuff:Peru:Pink:Plum:PowderBlue:Purple:RebeccaPurple:Red:RosyBrown:RoyalBlue:SaddleBrown:Salmon:SandyBrown:SeaGreen:SeaShell:Sienna:Silver:SkyBlue:SlateBlue:SlateGrey:Snow:SpringGreen:SteelBlue:Tan:Teal:Thistle:Tomato:Turquoise:Violet:Wheat:White:WhiteSmoke:Yellow:YellowGreen`

  const [color, setColor]=useState([...hues.split(":")]);
  const [temp, setTemp] = useState(color);
  const [atHome, setHome] = useState(true)
  localStorage.setItem('_hue',localStorage.getItem('_hue')||'Histroy')
  const addToList = (what)=>{
    const recentHue = localStorage.getItem('_hue')||"Histroy";
    localStorage.setItem('_hue',`${recentHue}:${what}`);
    if(!atHome){
      setColor(localStorage.getItem('_hue').split(':'));
      setTemp(localStorage.getItem('_hue').split(':'))
    }
  }

  const copyText = (e) =>{
  const text = e.target.parentElement.getAttribute('data-content');
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert(`${text} is Copied!`)
  addToList(text)
  }

 
  return (
    <>
      <h1 className="title"><img src={logo}/>HueChooser<img src={logo}/></h1>
      <h5>Note: Click on The Color For Copying in ClipBoard</h5>

    <div className="searchbar">
      <input 
        placeholder="Color Name ..." 
        className="search" 
        onChange={e=>{
            let a = color.filter(k=>(k.toLowerCase()).indexOf(e.target.value.toLowerCase())!=-1)
            setTemp(a)
            if(a.length==0&&e.target.value.indexOf('#')==0){
              setTemp([e.target.value])
            }if(a.length==0&&e.target.value.indexOf('#')!=0){
              setTemp(['ColorNotFound!'])
      }
    }}/>

    <img className="recentBtn" src={!atHome?home:recent} onClick={()=>{setHome(!atHome)
    if(!atHome){
      setColor(hues.split(":"))
      setTemp(hues.split(":"))
    }else{
      setColor(localStorage.getItem('_hue').split(':'));
      setTemp(localStorage.getItem('_hue').split(':'))
    }
    }}/>

    </div>
    <div className="App">
      {temp.map(e=>{
        return <div 
        className="colorBox" 
        data-content={e} 
        style={{background:e}}
        
        >
       { atHome?<img className="copyImg" title="click for Copied!" src={copy} onClick={(e)=>{
           copyText(e);
        }}
        />:<><img className="close" src={close} onClick={e=>{
            const hue = e.target.parentElement.getAttribute('data-content');
            setTemp(temp.filter((k=>k!=hue)));
            localStorage.setItem('_hue',temp.filter((k=>k!=hue)).join(":"));
        }}/>
        
        
        </>}

        
        </div>
      })}
    </div>
    </>
  );
}

export default App;
