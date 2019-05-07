export interface Cuenta {
    id_cuenta?: number;
    id_tipo_documento?: number;
    documento?: number;
    primer_nombre?: string;
    segundo_nombre?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    correo?: string;
    celular?: number;
    id_rol?: number;
}