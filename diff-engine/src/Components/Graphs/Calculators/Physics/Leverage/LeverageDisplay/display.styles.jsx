import styled, { css } from "styled-components";
import { backgroundColors,errorIndicator } from "../../../../global.styles";

const { paper,dark } = backgroundColors
export const widthOfLeverBar = 400; // --- In pixels

export const LeverageDisplayContainer = styled.section`
    position:absolute;
    font-size:20px;
    bottom:0px;
    width:100%;
    height:100%;
    background-color:${({darkmode}) => darkmode ? dark:paper};
    color:${({darkmode}) => darkmode ? '#fff':'black'};
    border: solid 1px;
    border-radius:5px;
    z-index:1;

    p {
        font-size:20px;
        position:absolute;
    }   
`

export const LeverBarContainer = styled.div`
    position:absolute;
    width:${widthOfLeverBar}px;
    height:1px;
    margin:auto;
    top:350px;
    left:50px;
    border-top: solid;
    border-color: red;
    text-align:left;
    transform:rotate(${({rotation}) => rotation}deg);
    transition: all 1000ms;

    span {
        transform:rotate(${({rotation}) => -rotation}deg);
    }
`

export const LeverBarText = styled.i`
    top:-30px;
    left:90px;
    position:absolute;
    width:210px;
`

export const Fulcrum = styled.span`
    top:24px;
    border-left:solid;
    transition: all 1000ms;
    position:absolute;

    svg {
        position:absolute;
        left:-11px;
        top:-5px;
    }
`

export const FulcrumText = styled.i`
    position:absolute;
    top:50px;
    left:-30px;
    width:200px;
    font-weight:600;
    ${({condition}) => condition && errorIndicator}
`

export const Axis = styled.div`
    position:absolute;
    width:${widthOfLeverBar}px;
    border-bottom:solid;
    border-style: dashed none none none;
    height:1px;
    opacity:.5;
    top:-5px;
    transition: all 1000ms;

    i {
        position:absolute;
        left:0px;
        top:-30px;
    }
`

export const ValDisplay = styled.div`
    top:80px;
    position:absolute;
    width:100px;
    height:100px;
    display:flex;
    justify-content:center;
    align-item:center;
`

export const InputForceValue = styled(ValDisplay)`
    left:10px;
    border-radius:50%;
    // background-color:blue;
    border:solid;

    strong {
        margin:auto;
    }
`

export const OutputForceValue = styled(InputForceValue)`
    left:390px;
`

export const Length = styled.i`
    position:absolute;
    ${({condition}) => condition && errorIndicator}
`

export const TotalLength = styled(Length)`    
    font-size:20px;
    position:relative;
`

export const D_eLength = styled(Length)`
    top:190px;
    left:60px;
    
    svg {
        position:absolute;
        top:30px;
        left:20px;
    }
`

export const D_rLength = styled(D_eLength)`
    left:380px;
`