const createFrameBuffer = (
  gl,
  {
    width,
    height,
    tiling = gl.CLAMP_TO_EDGE,
    type = gl.UNSIGNED_BYTE,
    format = gl.RGBA,
    internalFormat = gl.RGBA,
    data = null,
    singular = false,
    minFilter = gl.LINEAR,
    magFilter = minFilter,
    mips = false,
  } = {}
) => {
  const createRendertarget = ({ w = width, h = height } = {}) => {
    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      w,
      h,
      0,
      format,
      type,
      data
    );

    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, tiling);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, tiling);

    // Create and bind the framebuffer
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

    // attach the texture as the first color attachment
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      targetTexture,
      0
    );

    if (mips) gl.generateMipmap(gl.TEXTURE_2D);

    return { fb, targetTexture };
  };
  const framebuffer = {
    width,
    height,
    read: createRendertarget({ w: width, h: height }),
    write: singular ? null : createRendertarget({ w: width, h: height }),
    resize(width, height) {
      this.width = width;
      this.height = height;
      this.read = createRendertarget({ w: width, h: height });
      this.write = createRendertarget({ w: width, h: height });
    },
    swap() {
      if (singular) return;
      const oldread = this.read;
      this.read = this.write;
      this.write = oldread;
    },
  };

  return framebuffer;
};

export { createFrameBuffer };
