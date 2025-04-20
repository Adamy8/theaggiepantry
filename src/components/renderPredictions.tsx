const limits = { banana: 1, carrot: 2, bottle: 1, broccoli: 2, donut: 2 };
const categories = [ "banana", "carrot", "bottle", "broccoli", "donut"];

export const renderPredictions = (predictions, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //fonts
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    // Count occurrences of each item
    const itemCounts = {};
    predictions.forEach(pred => {
        if (categories.includes(pred.class)) {
            itemCounts[pred.class] = (itemCounts[pred.class] || 0) + 1;
        }
    });

    predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;
        
        // Check if item count exceeds limit
        const isExceeded = itemCounts[prediction.class] > limits[prediction.class];
        
        // Set color based on limit check
        ctx.strokeStyle = isExceeded ? "#FF0000" : "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        // Background for class name
        ctx.fillStyle = isExceeded ? "#FF0000" : "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
        
        // Class name text
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);

        // Display warning message if limit exceeded
        if (isExceeded) {
            const warningMsg = "You have exceeded the limit";
            const warningWidth = ctx.measureText(warningMsg).width;
            ctx.fillStyle = "#FF0000";
            ctx.fillText(warningMsg, x, y + height + 20);
        }
    });
}
