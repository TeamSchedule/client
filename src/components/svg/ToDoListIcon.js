function ToDoListIcon({ color, size }) {
    return (
        <>
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                enableBackground="new 0 0 32 32"
                fill={color}
                stroke={color}
            >
                <line
                    fill="none"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    x1="15"
                    y1="16"
                    x2="28"
                    y2="16"
                />
                <polyline
                    fill="none"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="5,16 7,18 11,14 "
                />
                <line
                    fill="none"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    x1="15"
                    y1="8"
                    x2="28"
                    y2="8"
                />
                <polyline
                    fill="none"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="5,8 7,10 11,6 "
                />
                <line
                    fill="none"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    x1="15"
                    y1="24"
                    x2="28"
                    y2="24"
                />
                <polyline
                    fill="none"
                    stroke="inherit"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="5,24 7,26 11,22 "
                />
            </svg>
        </>
    );
}

export default ToDoListIcon;
