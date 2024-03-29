import { useEffect,useContext } from "react";
import { ViewContext } from "../../../../Context/view.context";
import { uturnArrow } from "../../../SVG";
import { NumberPad } from "../../../KeyPad/NumberPad/nums.component";
import { KeyBox,InfoMessage } from "../../../KeyPad/input.styles";
import Button from "../../../KeyPad/Button";

import TemperatureKeys from "./Temperature/temp.keys";
import LengthKeys from "./Length/length.keys";
import MassKeys from "./Mass/mass.keys";

const vp = 80 // -- Vertical Position

const UnitsKeys = (props) => {

    const {
        state,
        execute,
        setState,
    } = props

    const {unitType,mathFunc} = state

    const {
        setDisplayKeymap,
        displayKeymap,
        setCurrentView,
        currentView
    } = useContext(ViewContext)

    useEffect(() => {
        setState({
            ...state,
            mathFunc:``,
            displayInput:false,
            polars:false,
        })
    },[])

    const changeSign = (e) => {
        e.preventDefault()
        const mathArr = mathFunc.split('')
        mathArr[0] != '-' ? mathArr.splice(0,0,'-') : mathArr.splice(0,1,'')
        execute(e,'mathFunc',mathArr.join(''))
    }

    // const pasteFromClipboard = (e) => {
    //     e.preventDefault()
        
    //     try {

    //         navigator.clipboard.readText()
    //         .then(text => {
    //                 // --- verify that copied items are integers or floats in string format --- //
    //                 try {
    //                     if (typeof(text) === 'string') {
                            
    //                             if (text.split('').length <= 30) {
    //                                 setState({
    //                                     ...state,
    //                                     mathFunc:text
    //                                 })
                                
    //                         } else {execute(e,'alert','The value you entered is too long. Enter a value that is less than 30 charecters long')}
    //                     } else {execute(e,'alert','Invalid input type for this calculation')}
    //                 } catch (error) {
    //                     console.log(error)
    //                 }
    //             })
    //             .catch(err => {
    //                 // console.log('err',err)
    //                 execute(e,'alert','Failed to read clipboard contents: '+ err);
    //             });
    //     } catch (error) {execute(e,'alert',"Sorry, this function might not be compatible with the browser you're using",error)}

    // }

    return (
        
        <KeyBox displayKeymap={displayKeymap}>

        {/* HINT BOX */}
        {displayKeymap && <InfoMessage style={{zIndex:'10',top:'-160px',left:'150px'}}>Click item to copy it's value</InfoMessage>}

            <NumberPad
                state={state}
                setState={setState}
            />

            {unitType === 'Length' && <LengthKeys execute={execute} {...state} />}
            {unitType === 'Mass' && <MassKeys execute={execute} {...state}/>}
            {unitType === "Temperature" && <TemperatureKeys execute={execute} {...state}/>}

            <Button
                style={{right:'160px'}}
                onClick={(e) => execute(e,'unitType','Mass')}
                text={'Mass'}
                selected={unitType === 'Mass'}
            />

            <Button
                style={{right:'160px',top:`${vp}px`}}
                onClick={(e) => execute(e,'unitType','Length')}
                text={'Length'}
                selected={unitType === 'Length'}
            />

            <Button
                style={{right:'160px',top:`${vp*2}px`}}
                onClick={(e) => execute(e,'unitType','Temperature')}
                text={'Temp'}
                selected={unitType === 'Temperature'}
            />

            <Button
                style={{right:'0px',zIndex:'1'}}
                // onClick={(e) => close(e)}
                onClick={() => setCurrentView('converters')}
                text={uturnArrow()}
                p={'Home'}
            />

            <Button
                styles={{right:'0px',top:`${vp}px`,zIndex:'0'}}
                onClick={(e) => setDisplayKeymap(true)}
                buttonType={'image'}
                text={'?'}
                buttonClass={'help'}
            />

            {/* <Button
                buttonClass={'tiny'}
                style={{right:'0px',bottom:`-195px`,zIndex:'0'}}
                onClick={(e) => pasteFromClipboard(e)}
                text={'paste'}
                p={'Paste text from clipboard'}
            /> */}

            <Button
                style={{right:'265px',bottom:`-195px`,zIndex:'1',fontSize:'32px'}}
                onClick={(e) => changeSign(e)}
                text={'-'}
                p={'Change sign'}
            />

            <Button
                buttonClass={'all_clear'}
                text={'AC'}
                style={{left:'0px',bottom:`-195px`,zIndex:'1'}}
                p={'All clear'}
                onClick={(e) => execute(e,'mathFunc','')}
            />

        </KeyBox>
        
    )
}

export default UnitsKeys