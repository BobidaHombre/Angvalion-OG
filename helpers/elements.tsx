export const generateAuthorSignature = (
  names: string[],
  alignRight = false
) => {
  return names
    .sort((a, b) => a.length - b.length)
    .map((name, index) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: alignRight ? "flex-end" : "flex-start",
            marginBottom: index < names.length - 1 ? 8 : 0
          }}
        >
          <img
            style={{
              marginRight: "12px",
              objectFit: "contain"
            }}
            src="https://og.angvalion.com/img/originals/pen.png"
            width="20px"
            height="20px"
          />
          <span
            style={{
              lineHeight: "1em",
              fontSize: "20px",
              fontWeight: 500,
              color: "#f6f6f6"
            }}
          >
            {name}
          </span>
        </div>
      );
    });
};
