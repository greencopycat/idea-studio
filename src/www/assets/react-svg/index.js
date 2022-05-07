const svgIcons = {
    svgDelete: (
        <svg
            aria-label={`Delete`}
            viewBox="0 0 48 48"
            id="svg-delete"
            xmlns="http://www.w3.org/2000/svg">
            <rect
                style={{fill: 'none', stroke: 'currentColor'}}
                width="27"
                height="27"
                x="11"
                y="11" />
            <path
                style={{fill: 'none', stroke: 'currentColor'}}
                d="M 32.521311,15.802339 C 27.151583,21.226374 21.781855,26.650409 16.412127,32.074445"
                className="accent" />
        </svg>),
    svgModify: (
        <svg
            aria-label={`Modify`}
            viewBox="0 0 48 48"
            id="svg-modify"
            xmlns="http://www.w3.org/2000/svg">
                <rect
                    style={{fill: 'none', stroke: 'currentColor'}}
                    width="27"
                    height="27"
                    x="11"
                    y="11" />
                <path
                    style={{fill: 'none', stroke: 'currentColor'}}
                    d="m 17.819022,15.026475 c 0.0384,5.76674 0.0768,11.53348 0.115204,17.30022"
                    className="accent" />
        </svg>
    )
}

export default svgIcons