export default function HeroBanner({styles}) {


    return(
        <>
        
            <div style={{
                width: "100%",
                height: "60px",
                display: "flex",
                alignItems: "center",
                color: "red",
                background: "linear-gradient(to right, #d9ff2f, #ddc724)"

                
            }}>
                <strong className={styles.marqueeText} style={{ fontSize: "20px",
                    textShadow: "0 2px black"
                 }}>Chào mừng tết nguyên đán 2026 🌸</strong>
            </div>
        </>
    )
}