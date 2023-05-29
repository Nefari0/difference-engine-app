import { useContext } from "react"
import { ViewContext } from "../../Context/view.context"
import StandarMathDisplay from "../Calculators/Standard/standard.display"
import FractionCalc from "../Calculators/Fractions/frac.display"
import Units from "../Calculators/UnitConverter/units.display"
import PercentDisplay from "../Calculators/Percentages/percent.display"
import { Table,Row,GridCell,MathFormula } from "./display.styles"
import NumberLine from "./NumberLines/nums.component"
import { vNumParams,hNumParams } from "./NumberLines/numlineParams"
import { MathComponent } from "mathjax-react"
import GraphingModule from "./graphing.module"


const DisplayModule = (props) => {

    const { 
        state,
        setState,
        execute,
    } = props

    const {
        xAspect,
        yAspect,
        polars,
        showUnitCircleAngles,
        mathFunc,
        matrix,
        polarCoords,
        cartCoords
    } = state

    const {
        darkmode,
        currentView,
        setAlert,
    } = useContext(ViewContext)

    const copy = () => {
        if (returnPlots()[0]) {
          navigator.clipboard.writeText(JSON.stringify(returnPlots()))
          setState({...state,noticeContent:"X and Y coordinates copied to clipboard"})
        } else {
          setAlert(`There are no coordinates yet. Please run the calculation by pressing the "Cartesian" or "Polar" button below`)
        }
    }

    const vectorMap = (coordArray) => {
        const mappedItems = coordArray.map((el,i) => {
          var locations = {
            bottom: `${yAspect*el[1]}px`,
            left: `${xAspect*el[0]}px`,
            borderRadius: "50%",
            backgroundColor: `${darkmode ? 'white' : 'red'}`,
            position: "absolute",
            transition: "all 1000ms",
            width: "2px",
            height: "2px"
          };
          return <p style={locations} key={i}></p>;
        })
        return <div>{mappedItems}</div>
    }
      
    const returnPlots = () => {
        return (polars === true ? polarCoords : cartCoords)
    }

    const mappedTiles = matrix.map((row, id1) => {
        return row.map((col, id2) => {
          return <GridCell key={id2} darkmode={darkmode}></GridCell>;
        });
      });

    return (
        <Table
            darkmode={darkmode}   
        >
            <Row>

                {/* GRID CELLS */}
                {!polars && mappedTiles}

                {/* NUMBER LINES */}
                {!polars &&
                    <div>
                        <NumberLine parameters={hNumParams} darkmode={darkmode} />
                        <NumberLine parameters={vNumParams} darkmode={darkmode} />
                    </div>
                }

                {/* GRAPHING */}
                {/* {!currentView && 
                    <Button 
                        p={'copy coordinates'}
                        style={{position:'absolute',width:'75px',height:'75px',left:'10px',top:'10px',zIndex:'100',opacity:'.6 '}}
                        onClick={() => copy()}
                        text={CopyIcon()}
                    />
                } */}
                <GraphingModule
                    state={state}
                    setState={setState}
                    returnPlots={returnPlots}
                    vectorMap={vectorMap}
                />

                {/* CURRENT MATH FORMULA */}
                <MathFormula darkmode={darkmode} >
                    {!showUnitCircleAngles && <MathComponent tex={String.raw`${mathFunc.replace(/ /g, "").replace(/\*/g, ' \\cdot ')}`} />}
                </MathFormula>

                {/* PERCENT CALCULATOR */}
                {currentView === 'percentages' && <PercentDisplay
                    state={state}
                    setState={setState}
                />}

                {/* DISPLAY UNIT CONVERTER */}
                {currentView === 'unit_converter' && <Units
                    state={state}
                    setState={setState}
                    execute={execute}
                />}

                {/* DISPLAY FRACTION CALCULATOR */}
                {currentView === 'fracs' && <FractionCalc
                    state={state}
                    input={mathFunc}
                />}

                {/* DISPLAY STANDARD CALCULATOR RESULTS */}
                {currentView === 'standard' && <StandarMathDisplay
                    state={state}
                    setState={setState}
                    execute={execute}
                />}

            </Row>
            
        </Table>
    )
}

export default DisplayModule