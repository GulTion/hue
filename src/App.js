import React,{useState} from 'react';

import './App.css';
import logo from './brush.svg'
import copy from './copy.svg'
function App() {
  const hues = `AliceBlue:AntiqueWhite:Aqua:Aquamarine:Azure:Beige:Bisque:Black:BlanchedAlmond:Blue:BlueViolet:Brown:BurlyWood:CadetBlue:Chartreuse:Chocolate:Coral:CornflowerBlue:Cornsilk:Crimson:Cyan:DarkBlue:DarkCyan:DarkGoldenRod:DarkGrey:DarkGreen:DarkKhaki:DarkMagenta:DarkOliveGreen:DarkOrange:DarkOrchid:DarkRed:DarkSalmon:DarkSeaGreen:DarkSlateBlue:DarkSlateGray:DarkSlateGrey:DarkTurquoise:DarkViolet:DeepPink:DeepSkyBlue:DimGray:DodgerBlue:FireBrick:FloralWhite:ForestGreen:Fuchsia:Gainsboro:GhostWhite:Gold:GoldenRod:Gray:Green:GreenYellow:HoneyDew:HotPink:IndianRed:Indigo:Ivory:Khaki:Lavender:LavenderBlush:LawnGreen:LemonChiffon:LightBlue:LightCoral:LightCyan:LightGoldenRodYellow:LightGray:LightGrey:LightGreen:LightPink:LightSalmon:LightSeaGreen:LightSkyBlue:LightSlateGrey:LightSteelBlue:LightYellow:Lime:LimeGreen:Linen:Magenta:Maroon:MediumAquaMarine:MediumBlue:MediumOrchid:MediumPurple:MediumSeaGreen:MediumSlateBlue:MediumSpringGreen:MediumTurquoise:MediumVioletRed:MidnightBlue:MintCream:MistyRose:Moccasin:NavajoWhite:Navy:OldLace:Olive:OliveDrab:Orange:OrangeRed:Orchid:PaleGoldenRod:PaleGreen:PaleTurquoise:PaleVioletRed:PapayaWhip:PeachPuff:Peru:Pink:Plum:PowderBlue:Purple:RebeccaPurple:Red:RosyBrown:RoyalBlue:SaddleBrown:Salmon:SandyBrown:SeaGreen:SeaShell:Sienna:Silver:SkyBlue:SlateBlue:SlateGrey:Snow:SpringGreen:SteelBlue:Tan:Teal:Thistle:Tomato:Turquoise:Violet:Wheat:White:WhiteSmoke:Yellow:YellowGreen`

  const [color, setColor]=useState([...hues.split(":")]);
  const [temp, setTemp] = useState(color)
  return (
    <>
    <h1 className="title"><img src={logo}/>HueChooser<img src={logo}/></h1>
    <h5>Note: Click on The Color For Copying in ClipBoard</h5>
    <input placeholder="Color Name ..." className="search" onChange={e=>{
      let a = color.filter(k=>(k.toLowerCase()).indexOf(e.target.value.toLowerCase())!=-1)
      
      setTemp(a)
      if(a.length==0&&e.target.value.indexOf('#')==0){
        setTemp([e.target.value])
      }if(a.length==0&&e.target.value.indexOf('#')!=0){
        setTemp(['ColorNotFound!'])
      }
    }}/>
    <div className="App">
      {temp.map(e=>{
        return <div 
        className="colorBox" 
        data-content={e} 
        style={{background:e}}
        
        ><img title="click for Copied!" src={copy} onClick={(e)=>{
           const text = e.target.parentElement.getAttribute('data-content');
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert(`${text} is Copied!`)
        }}/></div>
      })}
    </div>
    </>
  );
}

export default App;
