export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}

  add(v: Vector3) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  sub(v: Vector3) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
  }

  mul(v: number) {
    return new Vector3(this.x * v, this.y * v, this.z * v)
  }

  div(v: number) {
    return new Vector3(this.x / v, this.y / v, this.z / v)
  }

  toRGB() {
    return `rgb(${this.x} ${this.y} ${this.z})`
  }
}

export class Vector2 {
  constructor(public x: number, public y: number) {}

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  sub(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  mul(v: number) {
    return new Vector2(this.x * v, this.y * v)
  }

  div(v: number) {
    return new Vector2(this.x / v, this.y / v)
  }
}
