import { Numbers } from "./nums.styles"

const NumberLine = ({parameters,darkmode}) => {

    const nums = [-4,-3,-2,-1,0,1,2,3,4]

    const mappedNumber = nums.map(el => {
        return (
            <li key={el}>
                <strong>
                    {el}
                </strong>
            </li>
        )
    })

    return (
        <Numbers
            parameters={parameters}
            darkmode={darkmode}
        >
            {mappedNumber}
        </Numbers>
    )
}

export default NumberLine