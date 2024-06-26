import Button from "../../../../KeyPad/Button"

const vp = 80 // -- Vertical Position

const TemperatureKeys = ({execute,units}) => {

    return (
        <>

            <Button
                style={{right:'80px',zIndex:'1',fontSize:'22px'}}
                onClick={(e) => execute(e,'units','celsius')}
                text={'C'}
                p={'celsius'}
                buttonClass={'operator'}
                selected={units === 'celsius'}
            />

            <Button
                style={{right:'80px',zIndex:'1',top:`${vp}px`,fontSize:'22px'}}
                onClick={(e) => execute(e,'units','fahrenheit')}
                text={'F'}
                p={'fahrenheit'}
                buttonClass={'operator'}
                selected={units === 'fahrenheit'}
            />

        </>
    )
}

export default TemperatureKeys