import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile,
  sidePanel,
} from 'functions';
import styled from 'styled-components';
import PrimaryButton from 'components/atoms/Buttons/PrimaryButton';
import axios from 'axios';
import { updateImage } from 'actions';
import store from 'store';
import path from '../../../path';

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1024px;
  height: 590px;
  background: ${({ theme }) => theme.colors.imageResizerBackground};
  overflow: hidden;
  border-radius: 7px;
  @media ${({ theme }) => theme.media.small} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: none;
    overflow: auto;
  }
  @media ${({ theme }) => theme.media.medium} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: none;
    overflow: auto;
  }
  @media ${({ theme }) => theme.media.tablet} {
    position: fixed;
    top: 50%;
    left: 0;
    width: 100vw;
    transform: translateY(-50%);
    overflow: auto;
  }
  @media ${' (width:568px) and (orientation: landscape)'} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: none;
    overflow: auto;
  }
  @media ${' (width:812px) and (orientation: landscape)'} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: none;
    overflow: auto;
  }
  @media ${' (width:823px) and (orientation: landscape)'} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: none;
    overflow: auto;
  }

  header {
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    background: ${({ theme }) => theme.colors.primaryBlue};
    font-size: ${({ theme }) => theme.fontSize.ml};
    font-weight: ${({ theme }) => theme.font.bold};
    color: white;
    @media ${({ theme }) => theme.media.small} {
      display: none;
    }
    @media ${({ theme }) => theme.media.medium} {
      display: none;
    }
    @media ${' (width:568px) and (orientation: landscape)'} {
      display: none;
    }
    @media ${' (width:812px) and (orientation: landscape)'} {
      display: none;
    }
    @media ${' (width:823px) and (orientation: landscape)'} {
      display: none;
    }
  }
  section {
    display: grid;
    grid-template-columns: 7fr 2fr;
    grid-template-rows: 490px;
    grid-gap: 5px;
    max-height: calc(100% - 55px);
    @media ${({ theme }) => theme.media.small} {
      margin-top: 50px;
      min-height: 410px;
      height: calc(100% - 200px);
      display: block;
      width: 100%;
    }
    @media ${({ theme }) => theme.media.medium} {
      margin-top: 50px;
      display: block;
      width: 100%;
    }
    @media ${' (width:568px) and (orientation: landscape)'} {
      margin-top: 50px;
      min-height: 410px;
      height: calc(100% - 200px);
      display: block;
      width: 100%;
    }
    @media ${' (width:812px) and (orientation: landscape)'} {
      margin-top: 50px;
      min-height: 410px;
      height: calc(100% - 200px);
      display: block;
      width: 100%;
    }
    @media ${' (width:823px) and (orientation: landscape)'} {
      margin-top: 50px;
      min-height: 410px;
      height: calc(100% - 200px);
      display: block;
      width: 100%;
    }

    .imageContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${({ theme }) => theme.colors.imageResizerBackground};
      .image {
        text-align: center;
        user-select: none;
        img {
          height: 364px;
        }

        .ratioButtons {
          @media ${({ theme }) => theme.media.medium} {
            position: fixed;
            top: 0;
            right: 0;
            width: 100px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          @media ${' (width:568px) and (orientation: landscape)'} {
            position: fixed;
            top: 0;
            right: 10px;
            width: 100px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          @media ${' (width:812px) and (orientation: landscape)'} {
            position: fixed;
            top: 0;
            right: 0;
            width: 100px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          @media ${' (width:823px) and (orientation: landscape)'} {
            position: fixed;
            top: 0;
            right: 0;
            width: 100px;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
    .preview {
      position: relative;
      text-align: center;
      height: 100%;
      border-left: 4px solid ${({ theme }) => theme.colors.imageResizerContent};
      background: ${({ theme }) => theme.colors.imageResizerBackground};

      canvas {
        width: 170px;
        padding: 3px;
        border: 1px solid ${({ theme }) => theme.colors.imageResizerContent};
      }

      .header {
        height: 25px;
        margin: 15px 0 0 25px;
        font-size: ${({ theme }) => theme.fontSize.ms};
        color: ${({ theme }) => theme.colors.lightGrey};
        font-weight: ${({ theme }) => theme.font.thin};
        text-align: left;
        font-style: italic;
      }
      @media ${({ theme }) => theme.media.small} {
        display: none;
      }
      @media ${({ theme }) => theme.media.medium} {
        display: none;
      }
      @media ${' (width:568px) and (orientation: landscape)'} {
        display: none;
      }
      @media ${' (width:812px) and (orientation: landscape)'} {
        display: none;
      }
      @media ${' (width:823px) and (orientation: landscape)'} {
        display: none;
      }
    }
  }
  .bottom {
    position: relative;
    display: flex;
    border-top: 4px solid ${({ theme }) => theme.colors.imageResizerContent};
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 5px;
    width: 100%;
    height: 55px;

    @media ${({ theme }) => theme.media.small} {
      justify-content: center;
      align-items: flex-end;
      margin: 10px 0;
      border: none;
    }
    @media ${({ theme }) => theme.media.medium} {
      position: fixed;
      top: 0;
      width: 145px;
      height: 100%;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: stretch;
      border: none;
    }
    @media ${' (width:568px) and (orientation: landscape)'} {
      position: fixed;
      top: 0;
      width: 145px;
      height: 100%;
      flex-direction: column-reverse;
      justify-content: flex-start;
      margin: 0;
      align-items: stretch;
      border: none;
    }
    @media ${' (width:812px) and (orientation: landscape)'} {
      position: fixed;
      top: 0;
      width: 145px;
      height: 100%;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: stretch;
      border: none;
    }
    @media ${' (width:823px) and (orientation: landscape)'} {
      position: fixed;
      top: 0;
      width: 145px;
      height: 100%;
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: stretch;
      border: none;
    }
  }
  .imageInformation {
    font-size: ${({ theme }) => theme.fontSize.m};
    color: ${({ theme }) => theme.colors.buttonActive};
  }
`;

class ImageResizer extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewOnCanvas = React.createRef();

    this.state = {
      crop: {
        width: 200,
        height: 300,
        x: 0,
        y: 0,
        aspect: '0.67',
      },
    };
  }

  handleCropImage = crop => {
    this.setState({ crop });
  };

  handleCropComplete = crop => {
    const canvasRef = this.imagePreviewOnCanvas.current;
    const { imageSrc } = this.props;
    image64toCanvasRef(canvasRef, imageSrc, crop, 364);
  };

  handleButtons = e => {
    const { width, unit, x, y } = this.state.crop;
    const { ratio } = e.target.dataset;
    parseFloat(ratio);

    const crop = {
      aspect: ratio,
      width,
      height: width / ratio,
      unit,
      x,
      y,
    };
    this.setState({
      crop: {
        aspect: ratio,
        width,
        height: width / ratio,
        unit,
        x,
        y,
      },
    });

    this.handleCropImage(crop);
    this.handleCropComplete(crop);
  };

  handleUploadImage = () => {
    const canvasRef = this.imagePreviewOnCanvas.current;
    const { imageSrc } = this.props;

    const fileExtension = extractImageFileExtensionFromBase64(imageSrc);
    const imageData = canvasRef.toDataURL(`image/${fileExtension}`);
    const fileName = `userImage.${fileExtension}`;
    const finalFile = base64StringtoFile(imageData, fileName);

    const data = new FormData();
    data.append('image', finalFile);
    data.append('token', sessionStorage.getItem('userID'));
    axios
      .post(`${path.cors}handleImage.php`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(request => {
        sidePanel({ content: request.data, error: false });
      })
      .catch(error => {
        console.log('error :', error);
        sidePanel({ content: 'błąd sieci', error: true });
      });

    store.dispatch(updateImage(imageData));
    this.props.click();
    this.handleClearImage();
  };

  handleClearImage = () => {
    const crop = {
      width: 200,
      height: 300,
      x: 0,
      y: 0,
      aspect: '0.67',
    };
    setTimeout(() => {
      this.handleCropImage(crop);
      this.handleCropComplete(crop);
    }, 1000);
  };

  handleCancel = () => {
    const { click } = this.props;
    this.handleClearImage();
    click();
  };

  render() {
    const { crop } = this.state;
    const { imageSrc, language } = this.props;
    const polishLanguage = language === 'PL';

    return (
      <StyledWrapper>
        <header>{polishLanguage ? 'Kadrowanie zdjęcia' : 'Crop image'}</header>
        <section>
          <div className="imageContainer">
            <div className="image">
              <ReactCrop
                src={imageSrc}
                crop={crop}
                onChange={this.handleCropImage}
                onComplete={this.handleCropComplete}
                keepSelection
              />
              <div className="ratioButtons">
                <PrimaryButton
                  type="button"
                  primary={crop.aspect === '1'}
                  data-ratio="1"
                  onClick={this.handleButtons}
                  width="50px"
                >
                  1:1
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  primary={crop.aspect === '0.67'}
                  data-ratio="0.67"
                  onClick={this.handleButtons}
                  width="50px"
                >
                  2:3
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  primary={crop.aspect === '0.75'}
                  data-ratio="0.75"
                  onClick={this.handleButtons}
                  width="50px"
                >
                  3:4
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="preview">
            <div className="header">{polishLanguage ? 'Podgląd' : 'Preview'}</div>
            <canvas ref={this.imagePreviewOnCanvas} />
            {crop && (
              <div className="imageInformation">
                <div>{`${Math.round(crop.width)} x ${Math.round(crop.height)} px `}</div>
              </div>
            )}
          </div>
        </section>
        <div className="bottom">
          <PrimaryButton type="button" onClick={this.handleCancel} width="90px">
            {polishLanguage ? 'anuluj' : 'cancel'}
          </PrimaryButton>
          <PrimaryButton type="button" primary onClick={this.handleUploadImage}>
            {polishLanguage ? 'zapisz' : 'save'}
          </PrimaryButton>
        </div>
      </StyledWrapper>
    );
  }
}
export default ImageResizer;

// TODO: wystylizowanie kontenera ze zdjęciem i kontenera z podglądem
// TODO : wystyliowanie buttonow
