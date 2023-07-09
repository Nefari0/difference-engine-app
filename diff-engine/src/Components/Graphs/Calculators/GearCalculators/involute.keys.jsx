import { backButton,ExecuteButton,CopyIcon } from "../../SVG";
import { Py1 } from './gear.py1'
import { KeyBox } from "../../KeyPad/input.styles";
import Button from "../../KeyPad/Button";
import InputField from "../../KeyPad/InputField";
import { useEffect,useContext,useState } from "react";
import { ViewContext } from "../../../Context/view.context";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { cogScale } from "./involute.display";

const CogKeys = (props) => {

    const {state,
        setState,
        inputHandler,
        close,
    } = props
    const { mathFunc,uMax,blenderCoords } = state
    const {darkmode,setAlert,setDisplayKeymap} = useContext(ViewContext)

    useEffect(() => {
        // gears()
        setState({
            ...state,
            mathFunc:`40`,
            displayInput:false,
            polars:true,
        })
    },[])

    const z = mathFunc;
    const ref_dia1 = z; // reference diameter
    // const ref_radi = ref_dia1 / 2;
    // const tip_dia1 = ref_dia1 + 2;
    // const tip_radi = tip_dia1 / 2;
    const base_dia1 = ref_dia1 * 0.9396950000000001;
    // const base_circ = base_dia1 * 3.1415926;

    // const base_radi = base_dia1 / 2;
    // const root_diameter = ref_dia1 - 2.5;
    // const root_radi = root_diameter / 2;
    // console.log(blenderCoords)
    const gears = (increment) => {
        const u1 = [];
        const uMin = 0;
        // const uMax = 30;
        const newUMaxValue = uMax+increment
        const uStep = 50;
        for (let i = uMin; i < newUMaxValue; i++) {
            u1.push(i / uStep);
        }

    
        var invCoords = [] // For displaying in this app
        var exportCoords = [] // Scaled down for blender
        const xVector = [];
        const yVector = [];

        u1.forEach((el, i) => {
            xVector.push(cogScale*((base_dia1 / 2) * (Math.cos(u1[i]) + u1[i] * Math.sin(u1[i]))));
            yVector.push(cogScale*((base_dia1 / 2) * (Math.sin(u1[i]) - u1[i] * Math.cos(u1[i]))));
        });

        xVector.map((el,i) => {
            invCoords.push([xVector[i],yVector[i]])
            exportCoords.push([xVector[i]/cogScale,yVector[i]/cogScale,0])
        })

        setState({
            ...state,
            involute:invCoords,
            blenderCoords:JSON.stringify(exportCoords),
            uMax:newUMaxValue
        })
      }

    const pitch = 360 / mathFunc

    const copyScriptMessage = `A Python script that will generate your ${mathFunc} tooth gear tooth profile has been copied to clipboard. Paste and run this script in Blender's script editor to generate your gear tooth profile`
    const copyPitch = `${pitch} saved to clipbaord`

    const copyVal = (val,name,message) => {
        navigator.clipboard.writeText(val)
        setAlert(message)
    }

    const iStyle = {
        width:'300px',
        height:'50px',
        // backgroundColor:'blue',
        fontSize:'30px',
        position:'absolute',
        marginLeft:'100px'
    }

    return (
        <KeyBox style={{color:`${darkmode ? '#fff':'#555'}`}} darkmode={darkmode}>

            <InputField
                type='text'
                onChange={(e) => inputHandler(e)}
                value={mathFunc}
                name="mathFunc"
                inputClass={'small'}
                i={'Number of gear teeth'}
                iStyle={iStyle}
            />

            <Button 
                onClick={() => gears(0)}
                style={{right:'10px',top:'90px'}}
                text={ExecuteButton()}
            />

            <Button
                text={'+'}
                style={{top:'90px',right:'90px',fontSize:'30px'}}
                onClick={() => {gears(1)}}
            />

            <Button
                text={'-'}
                style={{top:'170px',right:'90px',fontSize:'30px'}}
                onClick={() => {gears(-1)}}
            />

            <Button 
                onClick={(e) => close(e)}
                styles={{right:'10px',top:'170px'}}
                text={backButton()}
            />

            
            <Button
                styles={{right:'10px',top:`${250}px`,zIndex:'1'}}
                buttonType={'image'}
                onClick={() => setDisplayKeymap(true)}
                darkmode={darkmode}
                text={'?'}
                buttonClass={'help'}
            />

            {pitch != 'Infinity' && parseFloat(mathFunc) >= 5 && <Button
                styles={{top:'90px',left:'0px',width:'170px',fontSize:'15px',zIndex:'2'}}
                onClick={() => copyVal(Py1(state),'alert',copyScriptMessage)}
                text={`Generate Profile`}
                buttonClass={'large'}
                p={'Save profile generator script'}
            />}

            {pitch != 'Infinity' && parseFloat(mathFunc) >= 5 && <Button
                styles={{top:'170px',left:'0px',width:'170px',fontSize:'15px',zIndex:'1'}}
                onClick={() => copyVal(pitch,'noticeContent',copyPitch)}
                text={`pitch = ${pitch}^\\circ`}
                buttonType={'image'}
                p={'copy pitch'}
            />}

            <a
                style={{
                    position:'absolute',
                    left:'0px',
                    fontSize:'30px',
                    fontWeight:'200',
                    bottom:'-120px',
                }}
                href='https://jupyter.madmodels3d.com/Involute%20Gear%20Calculator'
                target="_blank"
            >
                How to build your gear
            </a>

            <a
                style={{
                    position:'absolute',
                    left:'0px',
                    fontSize:'30px',
                    fontWeight:'200',
                    bottom:'-160px',
                }}
                href="https://www.blender.org/"
                target="_blank"
            >
                Download Blender
            </a>

        </KeyBox>
    )
}

export default CogKeys

// For testing in Blender
// verts1 = [[751.7560000000001,0,0],[751.906336165214,0.0020046024805073152,0],[752.3571642594625,0.016034895486146738,0],[753.1079431988271,0.05410694898958918,0],[754.1577715775912,0.12821759763082965,0],[755.5053882692227,0.2503348374781843,0],[757.1491732672819,0.43238824009377863,0],[759.0871487657762,0.6862593896568256,0],[761.3169804783677,1.0237723488866397,0],[763.8359791956817,1.4566841594910156,0],[766.641102579855,1.9966753828479478,0],[769.7289571953108,2.655340686606693,0],[773.0958007746283,3.4441794828700023,0],[776.7375447182312,4.374586623591773,0],[780.6497568265017,5.457843158793367,0],[784.8276642627796,6.705107163169274,0],[789.2661567455932,8.127404636615523,0],[793.959789968327,9.735620484174742,0],[798.902789244411,11.540489580849886,0],[804.089053375985,13.552587926693295,0],[809.5121587438656,15.782323897528691,0],[815.1653636165247,18.23992959661401,0],[821.0416126756553,20.935452312497414,0],[827.1335417557856,23.878746088263874,0],[833.4334827952778,27.079463407308545,0],[839.9334689959296,30.547047000711704,0]]