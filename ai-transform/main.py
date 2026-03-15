from fastapi import FastAPI, File, UploadFile
app = FastAPI()

@app.post("/transform")
async def transform(photo: UploadFile = File(...), mode: str = "young"):
    img_bytes = await photo.read()
    return {"image_bytes": img_bytes.hex()}
