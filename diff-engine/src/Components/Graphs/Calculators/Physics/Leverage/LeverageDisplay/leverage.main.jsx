import { useContext,useState } from "react";
import { ViewContext } from "../../../../../Context/view.context";
import { 
    LeverageDisplayContainer,
    LeverBarContainer,
    Fulcrum,
    InputForceValue,
    OutputForceValue,
    TotalLength,
    D_eLength,
    D_rLength,
    Axis
} from "../LeverageDisplay/display.styles";

import LeverBar from "./leverage.fulcrum";

// import Fulcrum from "./Fulcrum";

import { 
    upArrow,
    LongLeftArrow,
    LongRightArrow
 } from "../../../../SVG";

import CustomMath from "../../../../KeyPad/CostomMath";

const LeverageDisplay = (props) => {
    const { state } = props
    const { F_e,d_e,leverTotalLength} = state
    const d_r = parseFloat(leverTotalLength-d_e).toFixed(2)
    const { darkmode } = useContext(ViewContext)
    const d_eNum = Math.abs(parseFloat(d_e))
    const d_rNum = Math.abs(parseFloat(d_r))
    const totalLength = Math.abs(parseFloat(d_rNum+d_eNum))
    // const totalPercentage = Math.abs(parseFloat((leverTotalLength)) / 100)
    // const fulcrumDistance = Math.abs(parseFloat(d_e / totalPercentage))
    const resistance = ((d_r/d_e) * F_e).toFixed(2)
    // const distanceTraveled = d_eNum/totalLength
    // const leverBarLength = 400

    // const [rotation,setRotation] = useState(-10)

    // const fulcrumParameters = {
    //     left:`${fulcrumDistance > 100 ? '0' : fulcrumDistance}%`,
    //     transition: "all 1000ms",
    //     position:'absolute',
    // }

    // const leverBarOrigin = { // This is for dispaying rotational distances
    //     transformOrigin: `${fulcrumDistance > 100 ? '0' : fulcrumDistance}% 0px`,
    //     transform:`rotate(${rotation}deg)`,
    //     transition: "all 1000ms",
    // }

    // const axisOrigin = { // This is for dispaying rotational distances
    //     transformOrigin: `${fulcrumDistance > 100 ? '0' : fulcrumDistance}% 0px`,
    //     transition: "all 1000ms",
    //     top:'-5px'
    // }

    return (
        <LeverageDisplayContainer darkmode={darkmode}>
            {/* <h1>Leverage</h1> */}
            <h1>Force/Distance Multipliers</h1>
            
            <InputForceValue>
                <CustomMath >{`F_e = ${isNaN(F_e) ? '0':F_e}`}</CustomMath>
            </InputForceValue>

            <OutputForceValue>
                <CustomMath>
                    {`F_r = ${isNaN(resistance) ? '0' : resistance}`}
                </CustomMath>
            </OutputForceValue>

            <TotalLength>
                total length = {totalLength}
            </TotalLength>
            
            <D_eLength>
                <CustomMath>{`d_e = ${isNaN(d_e) ? '0' : d_e}`}</CustomMath>
                {LongRightArrow()}
            </D_eLength>

            <D_rLength>
                <CustomMath>{`d_r = ${isNaN(d_r) ? '0' : d_r}`}</CustomMath>
                {LongLeftArrow()}
            </D_rLength>

            {/* DISPLAY ANGLE GRAPH */}
            <LeverBar state={state}/>

        </LeverageDisplayContainer>
    )
}

export default LeverageDisplay