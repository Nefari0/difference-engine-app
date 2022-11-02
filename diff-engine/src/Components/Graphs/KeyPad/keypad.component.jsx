import { KeyBox,BaseButton,LargeButton,CloseHelp } from "./keypad.styles";
import { MathComponent } from "mathjax-react";
import { CalculatorIcon } from "../SVG";

// --- kaytex --- //
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
{/* <InlineMath math={frac} /> */}
const frac = `\\frac{${'string1'}\\pi }{${'string2'}}` 

const KeyPad = (props) => {

    const {
        execute,
        linearVector,
        polarVector,
        formatFunction,
        state,
    } = props

    const { mathFunc,degrees } = state 

    return (
        <KeyBox>

            <BaseButton
                style={{position:'absolute',right:'10px'}} 
                onClick={(e) => execute(e,'currentView','gaus')}
            >
                <div style={{fontSize:'30px',opacity:'.7'}}><InlineMath math={`\\mu`} /></div>
            </BaseButton>

            <BaseButton
                style={{position:'absolute',right:'100px',fontSize:'20px'}}
                onClick={(e) => execute(e,'currentView','unit_circle')}
            >
                <InlineMath math={`\\phase{${degrees}^\\circ}`} />
            </BaseButton>

            {/* FRACTIONS */}
            <BaseButton
                style={{position:'absolute',right:'100px',top:'85px',fontSize:'30px'}}
                onClick={(e) => execute(e,'currentView','fracs')}
            >
                <InlineMath math={`\\frac{${'a'} }{${'b'}}`} />
            </BaseButton>

            <BaseButton
                style={{right:'190px'}}
                onClick={(e) => execute(e,'currentView','standard')}
            >
                {CalculatorIcon()}
            </BaseButton>

            <BaseButton
                style={{right:'190px',top:'85px',fontSize:'10px'}}
                onClick={(e) => execute(e,'currentView','parabolas')}
            >
                {/* <InlineMath math={`\\left(x^{\\smash{2}}\\right)`} /> */}
                <MathComponent tex={String.raw`${`ax^2+bx+c`}`} />
            </BaseButton>

            <CloseHelp
                onClick={(e) => execute(e,'help',!state.help)}
                style={{right:'10px',top:'85px'}}
            >
                <strong>?</strong>
            </CloseHelp>

            <LargeButton
                style={{left:'0px'}}
                onClick={() => linearVector(mathFunc)}
            >
                Cartesian
            </LargeButton>

            <LargeButton
                style={{left:'120px'}}
                onClick={() => polarVector(mathFunc)}
            >
                Polar
            </LargeButton>

        </KeyBox>
    )
}

export default KeyPad