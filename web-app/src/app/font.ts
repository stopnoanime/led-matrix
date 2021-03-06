// based on characters from: https://github.com/dhepper/font8x8/blob/master/font8x8_basic.h
const font = [
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 00
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 01
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 02
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 03
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 04
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 05
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 06
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 07
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 08
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 09
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 0A
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 0B
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 0C
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 0D
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 0E
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 0F
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 10
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 11
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 12
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 13
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 14
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 15
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 16
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 17
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 18
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 19
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 1A
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 1B
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 1C
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 1D
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 1E
    [ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF ],   // 1F
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 20 (space)
    [ 0x18, 0x3C, 0x3C, 0x18, 0x18, 0x00, 0x18, 0x00 ],   // 21 (!)
    [ 0x6C, 0x6C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 22 (")
    [ 0x6C, 0x6C, 0xFE, 0x6C, 0xFE, 0x6C, 0x6C, 0x00 ],   // 23 (#)
    [ 0x30, 0x7C, 0xC0, 0x78, 0x0C, 0xF8, 0x30, 0x00 ],   // 24 ($)
    [ 0x00, 0xC6, 0xCC, 0x18, 0x30, 0x66, 0xC6, 0x00 ],   // 25 (%)
    [ 0x38, 0x6C, 0x38, 0x76, 0xDC, 0xCC, 0x76, 0x00 ],   // 26 (&)
    [ 0x60, 0x60, 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 27 (')
    [ 0x18, 0x30, 0x60, 0x60, 0x60, 0x30, 0x18, 0x00 ],   // 28 (()
    [ 0x60, 0x30, 0x18, 0x18, 0x18, 0x30, 0x60, 0x00 ],   // 29 ())
    [ 0x00, 0x66, 0x3C, 0xFF, 0x3C, 0x66, 0x00, 0x00 ],   // 2A (*)
    [ 0x00, 0x30, 0x30, 0xFC, 0x30, 0x30, 0x00, 0x00 ],   // 2B (+)
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x30, 0x60 ],   // 2C (,)
    [ 0x00, 0x00, 0x00, 0xFC, 0x00, 0x00, 0x00, 0x00 ],   // 2D (-)
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x30, 0x00 ],   // 2E (.)
    [ 0x06, 0x0C, 0x18, 0x30, 0x60, 0xC0, 0x80, 0x00 ],   // 2F (/)
    [ 0x7C, 0xC6, 0xCE, 0xDE, 0xF6, 0xE6, 0x7C, 0x00 ],   // 30 (0)
    [ 0x30, 0x70, 0x30, 0x30, 0x30, 0x30, 0xFC, 0x00 ],   // 31 (1)
    [ 0x78, 0xCC, 0x0C, 0x38, 0x60, 0xCC, 0xFC, 0x00 ],   // 32 (2)
    [ 0x78, 0xCC, 0x0C, 0x38, 0x0C, 0xCC, 0x78, 0x00 ],   // 33 (3)
    [ 0x1C, 0x3C, 0x6C, 0xCC, 0xFE, 0x0C, 0x1E, 0x00 ],   // 34 (4)
    [ 0xFC, 0xC0, 0xF8, 0x0C, 0x0C, 0xCC, 0x78, 0x00 ],   // 35 (5)
    [ 0x38, 0x60, 0xC0, 0xF8, 0xCC, 0xCC, 0x78, 0x00 ],   // 36 (6)
    [ 0xFC, 0xCC, 0x0C, 0x18, 0x30, 0x30, 0x30, 0x00 ],   // 37 (7)
    [ 0x78, 0xCC, 0xCC, 0x78, 0xCC, 0xCC, 0x78, 0x00 ],   // 38 (8)
    [ 0x78, 0xCC, 0xCC, 0x7C, 0x0C, 0x18, 0x70, 0x00 ],   // 39 (9)
    [ 0x00, 0x30, 0x30, 0x00, 0x00, 0x30, 0x30, 0x00 ],   // 3A (:)
    [ 0x00, 0x30, 0x30, 0x00, 0x00, 0x30, 0x30, 0x60 ],   // 3B (//
    [ 0x18, 0x30, 0x60, 0xC0, 0x60, 0x30, 0x18, 0x00 ],   // 3C (<)
    [ 0x00, 0x00, 0xFC, 0x00, 0x00, 0xFC, 0x00, 0x00 ],   // 3D (=)
    [ 0x60, 0x30, 0x18, 0x0C, 0x18, 0x30, 0x60, 0x00 ],   // 3E (>)
    [ 0x78, 0xCC, 0x0C, 0x18, 0x30, 0x00, 0x30, 0x00 ],   // 3F (?)
    [ 0x7C, 0xC6, 0xDE, 0xDE, 0xDE, 0xC0, 0x78, 0x00 ],   // 40 (@)
    [ 0x30, 0x78, 0xCC, 0xCC, 0xFC, 0xCC, 0xCC, 0x00 ],   // 41 (A)
    [ 0xFC, 0x66, 0x66, 0x7C, 0x66, 0x66, 0xFC, 0x00 ],   // 42 (B)
    [ 0x3C, 0x66, 0xC0, 0xC0, 0xC0, 0x66, 0x3C, 0x00 ],   // 43 (C)
    [ 0xF8, 0x6C, 0x66, 0x66, 0x66, 0x6C, 0xF8, 0x00 ],   // 44 (D)
    [ 0xFE, 0x62, 0x68, 0x78, 0x68, 0x62, 0xFE, 0x00 ],   // 45 (E)
    [ 0xFE, 0x62, 0x68, 0x78, 0x68, 0x60, 0xF0, 0x00 ],   // 46 (F)
    [ 0x3C, 0x66, 0xC0, 0xC0, 0xCE, 0x66, 0x3E, 0x00 ],   // 47 (G)
    [ 0xCC, 0xCC, 0xCC, 0xFC, 0xCC, 0xCC, 0xCC, 0x00 ],   // 48 (H)
    [ 0x78, 0x30, 0x30, 0x30, 0x30, 0x30, 0x78, 0x00 ],   // 49 (I)
    [ 0x1E, 0x0C, 0x0C, 0x0C, 0xCC, 0xCC, 0x78, 0x00 ],   // 4A (J)
    [ 0xE6, 0x66, 0x6C, 0x78, 0x6C, 0x66, 0xE6, 0x00 ],   // 4B (K)
    [ 0xF0, 0x60, 0x60, 0x60, 0x62, 0x66, 0xFE, 0x00 ],   // 4C (L)
    [ 0xC6, 0xEE, 0xFE, 0xFE, 0xD6, 0xC6, 0xC6, 0x00 ],   // 4D (M)
    [ 0xC6, 0xE6, 0xF6, 0xDE, 0xCE, 0xC6, 0xC6, 0x00 ],   // 4E (N)
    [ 0x38, 0x6C, 0xC6, 0xC6, 0xC6, 0x6C, 0x38, 0x00 ],   // 4F (O)
    [ 0xFC, 0x66, 0x66, 0x7C, 0x60, 0x60, 0xF0, 0x00 ],   // 50 (P)
    [ 0x78, 0xCC, 0xCC, 0xCC, 0xDC, 0x78, 0x1C, 0x00 ],   // 51 (Q)
    [ 0xFC, 0x66, 0x66, 0x7C, 0x6C, 0x66, 0xE6, 0x00 ],   // 52 (R)
    [ 0x78, 0xCC, 0xE0, 0x70, 0x1C, 0xCC, 0x78, 0x00 ],   // 53 (S)
    [ 0xFC, 0xB4, 0x30, 0x30, 0x30, 0x30, 0x78, 0x00 ],   // 54 (T)
    [ 0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0xFC, 0x00 ],   // 55 (U)
    [ 0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0x78, 0x30, 0x00 ],   // 56 (V)
    [ 0xC6, 0xC6, 0xC6, 0xD6, 0xFE, 0xEE, 0xC6, 0x00 ],   // 57 (W)
    [ 0xC6, 0xC6, 0x6C, 0x38, 0x38, 0x6C, 0xC6, 0x00 ],   // 58 (X)
    [ 0xCC, 0xCC, 0xCC, 0x78, 0x30, 0x30, 0x78, 0x00 ],   // 59 (Y)
    [ 0xFE, 0xC6, 0x8C, 0x18, 0x32, 0x66, 0xFE, 0x00 ],   // 5A (Z)
    [ 0x78, 0x60, 0x60, 0x60, 0x60, 0x60, 0x78, 0x00 ],   // 5B ([)
    [ 0xC0, 0x60, 0x30, 0x18, 0x0C, 0x06, 0x02, 0x00 ],   // 5C (\)
    [ 0x78, 0x18, 0x18, 0x18, 0x18, 0x18, 0x78, 0x00 ],   // 5D (])
    [ 0x10, 0x38, 0x6C, 0xC6, 0x00, 0x00, 0x00, 0x00 ],   // 5E (^)
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF ],   // 5F (_)
    [ 0x30, 0x30, 0x18, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 60 (`)
    [ 0x00, 0x00, 0x78, 0x0C, 0x7C, 0xCC, 0x76, 0x00 ],   // 61 (a)
    [ 0xE0, 0x60, 0x60, 0x7C, 0x66, 0x66, 0xDC, 0x00 ],   // 62 (b)
    [ 0x00, 0x00, 0x78, 0xCC, 0xC0, 0xCC, 0x78, 0x00 ],   // 63 (c)
    [ 0x1C, 0x0C, 0x0C, 0x7C, 0xCC, 0xCC, 0x76, 0x00 ],   // 64 (d)
    [ 0x00, 0x00, 0x78, 0xCC, 0xFC, 0xC0, 0x78, 0x00 ],   // 65 (e)
    [ 0x38, 0x6C, 0x60, 0xF0, 0x60, 0x60, 0xF0, 0x00 ],   // 66 (f)
    [ 0x00, 0x00, 0x76, 0xCC, 0xCC, 0x7C, 0x0C, 0xF8 ],   // 67 (g)
    [ 0xE0, 0x60, 0x6C, 0x76, 0x66, 0x66, 0xE6, 0x00 ],   // 68 (h)
    [ 0x30, 0x00, 0x70, 0x30, 0x30, 0x30, 0x78, 0x00 ],   // 69 (i)
    [ 0x0C, 0x00, 0x0C, 0x0C, 0x0C, 0xCC, 0xCC, 0x78 ],   // 6A (j)
    [ 0xE0, 0x60, 0x66, 0x6C, 0x78, 0x6C, 0xE6, 0x00 ],   // 6B (k)
    [ 0x70, 0x30, 0x30, 0x30, 0x30, 0x30, 0x78, 0x00 ],   // 6C (l)
    [ 0x00, 0x00, 0xCC, 0xFE, 0xFE, 0xD6, 0xC6, 0x00 ],   // 6D (m)
    [ 0x00, 0x00, 0xF8, 0xCC, 0xCC, 0xCC, 0xCC, 0x00 ],   // 6E (n)
    [ 0x00, 0x00, 0x78, 0xCC, 0xCC, 0xCC, 0x78, 0x00 ],   // 6F (o)
    [ 0x00, 0x00, 0xDC, 0x66, 0x66, 0x7C, 0x60, 0xF0 ],   // 70 (p)
    [ 0x00, 0x00, 0x76, 0xCC, 0xCC, 0x7C, 0x0C, 0x1E ],   // 71 (q)
    [ 0x00, 0x00, 0xDC, 0x76, 0x66, 0x60, 0xF0, 0x00 ],   // 72 (r)
    [ 0x00, 0x00, 0x7C, 0xC0, 0x78, 0x0C, 0xF8, 0x00 ],   // 73 (s)
    [ 0x10, 0x30, 0x7C, 0x30, 0x30, 0x34, 0x18, 0x00 ],   // 74 (t)
    [ 0x00, 0x00, 0xCC, 0xCC, 0xCC, 0xCC, 0x76, 0x00 ],   // 75 (u)
    [ 0x00, 0x00, 0xCC, 0xCC, 0xCC, 0x78, 0x30, 0x00 ],   // 76 (v)
    [ 0x00, 0x00, 0xC6, 0xD6, 0xFE, 0xFE, 0x6C, 0x00 ],   // 77 (w)
    [ 0x00, 0x00, 0xC6, 0x6C, 0x38, 0x6C, 0xC6, 0x00 ],   // 78 (x)
    [ 0x00, 0x00, 0xCC, 0xCC, 0xCC, 0x7C, 0x0C, 0xF8 ],   // 79 (y)
    [ 0x00, 0x00, 0xFC, 0x98, 0x30, 0x64, 0xFC, 0x00 ],   // 7A (z)
    [ 0x1C, 0x30, 0x30, 0xE0, 0x30, 0x30, 0x1C, 0x00 ],   // 7B ([)
    [ 0x18, 0x18, 0x18, 0x00, 0x18, 0x18, 0x18, 0x00 ],   // 7C (|)
    [ 0xE0, 0x30, 0x30, 0x1C, 0x30, 0x30, 0xE0, 0x00 ],   // 7D (])
    [ 0x76, 0xDC, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ],   // 7E (~)
    [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]    // 7F
];

export default font;