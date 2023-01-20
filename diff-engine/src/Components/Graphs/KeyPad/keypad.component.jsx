import { KeyBox,BaseButton,LargeButton,CloseHelp } from "./keypad.styles";
import { MathComponent } from "mathjax-react";
import { book,CalculatorIcon,CogWheel,beaker } from "../SVG";
import { useContext } from "react";
import { ViewContext } from "../../Context/view.context";

// --- kaytex --- //
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
{/* <InlineMath math={frac} /> */}
// const frac = `\\frac{${'string1'}\\pi }{${'string2'}}` 

const KeyPad = (props) => {

    const {
        setCurrentView,
        setDisplayKeymap,
        displayKeymap
    } = useContext(ViewContext)

    const {
        execute,
        linearVector,
        polarVector,
        state,
    } = props

    const { mathFunc,degrees } = state 

    return (
        <KeyBox displayKeymap={displayKeymap}>

            {/* <Hover /> */}

            <BaseButton
                state={state}
                style={{position:'absolute',right:'10px'}} 
                onClick={() => setCurrentView('gaus')}
            >
                <div style={{fontSize:'30px',opacity:'.7'}}><InlineMath math={`\\mu`} /></div>
                <p>Guasian</p>
            </BaseButton>

            <BaseButton
                style={{position:'absolute',right:'100px'}}
                onClick={() => setCurrentView('unit_circle')}
            >
                <InlineMath math={`\\phase{${degrees.toString().substring(0,3)}^\\circ}`} />
                <p>Unit circle and trig functions</p>
            </BaseButton>

            {/* FRACTIONS */}
            <BaseButton
                style={{position:'absolute',right:'100px',top:'85px'}}
                onClick={(e) => setCurrentView('fracs')}
            >
                <div style={{fontWeight:'600',opacity:'.6',fontSize:'32px'}}>
                    <InlineMath math={`\\frac{${'a'} }{${'b'}}`} />
                </div>
                <p>Decimal to fraction</p>
            </BaseButton>

            <BaseButton
                style={{right:'190px'}}
                onClick={(e) => setCurrentView('standard')}
            >
                {CalculatorIcon()}
                <p>Standard calculator</p>
            </BaseButton>

            <BaseButton
                style={{right:'190px',top:'85px',fontSize:'10px'}}
                onClick={() => setCurrentView('parabolas')}
            >
                <MathComponent tex={String.raw`${`ax^2+bx+c`}`} />
                <p>Quadratics</p>
            </BaseButton>

            <CloseHelp
                onClick={(e) => execute(e,'help',!state.help)}
                style={{right:'10px',top:'170px'}}
            >
                {book()}
                <p>Documentation and resources</p>
            </CloseHelp>

            <BaseButton
                style={{right:'190px',top:'170px'}}
                onClick={(e) => setDisplayKeymap(true)}
            >
                <strong style={{fontWeight:'600',opacity:'.6',fontSize:'32px'}}>?</strong>
            </BaseButton>

            <BaseButton
                onClick={() => setCurrentView('unit_converter')}
                style={{right:'100px',top:'170px'}}
            >
                <strong>{beaker()}</strong>
                <p>Unit Converter</p>
            </BaseButton>

            <BaseButton
                style={{right:'10px',top:'85px'}}
                onClick={() => setCurrentView('gear_calculator')}
            >
                {CogWheel()}
                <p>Gear calculator</p>
            </BaseButton>

            <LargeButton
                style={{left:'0px'}}
                onClick={() => linearVector(mathFunc)}
            >
                Cartesian
                <p>Execute cartesian coordinates</p>
            </LargeButton>

            <LargeButton
                style={{left:'120px'}}
                onClick={() => polarVector(mathFunc)}
            >
                Polar
                <p>Execute polar coordinates</p>
            </LargeButton>

        </KeyBox>
    )
}

export default KeyPad