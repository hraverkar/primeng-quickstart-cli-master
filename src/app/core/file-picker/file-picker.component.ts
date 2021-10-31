import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent implements OnInit {

  private _fileChanged: EventEmitter<File>;
  private _file: File;
  private _accept: string;
  private _isDragMouseOver: boolean;

  // #endregion

  // #region Constructor

  public constructor(private _renderer: Renderer2) {

    this._fileChanged = new EventEmitter<File>();
    this._file = null;
    this._isDragMouseOver = false;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // #endregion

  // #region Public Properties

  /**
   * The message to put inside the picker's window
   */
  @Input()
  public message;

  /**
   * A list of valid file types accepted
   * (default: [.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel])
   */
  @Input()
  public set fileTypes(value: string[]) {
    this._accept = value.join(",");
  }

  @Output()
  public get fileChanged(): EventEmitter<File> {
    return this._fileChanged;
  }

  @ViewChild("fileInput", { static: true })
  public inputElementReference: ElementRef;

  /**
   * A list of file types accepted for the input control
   */
  public get accept() {
    return this._accept;
  }

  /**
   * The file that was picked, if any
   */
  public get file(): File {
    return this._file;
  }

  /**
   * Indicates if the mouse is over this component while a drag action is taking place
   */
  public get isDragMouseOver(): boolean {
    return this._isDragMouseOver;
  }

  // #endregion

  // #region Public Methods

  /**
   * Event handler that is called when a drag element enters the drop zone
   * @param event The drag event
   */
  public onDragEnter(event: DragEvent): void {
    event.preventDefault();
    this._isDragMouseOver = true;
  }

  /**
   * Event handler that is called when a drag element is moved in the drop zone
   * @param event The drag event
   */
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Event handler that is called when a drag element leaves the drop zone
   * @param event The drag event
   */
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this._isDragMouseOver = false;
  }

  /**
   * Event handler that is called when a drag element is dropped into the drop zone
   * @param event The drag event
   */
  public onDrop(event: DragEvent): void {

    event.preventDefault();

    if (event.dataTransfer.files) {
      this.setFile(event.dataTransfer.files[0]);
    }

    this._isDragMouseOver = false;
  }

  /**
   * Event handler that is called when a file is chosen
   * @param event The file event
   */
  public onFileInput(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    this.setFile(inputElement.files[0]);
  }

  /**
   * Resets the file picker
   */
  public reset(): void {

    this._renderer.setProperty(this.inputElementReference.nativeElement, "value", "");
    this.setFile(null);
  }

  // #endregion

  // #region Private Properties

  private setFile(file: File): void {

    if (file !== this._file) {
      this._file = file || null;
      this._fileChanged.emit(this._file);
    }
  }

  // #endregion
}