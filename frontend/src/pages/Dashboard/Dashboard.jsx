import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ProductosService from '../../services/productos';
import CategoriasService from '../../services/categorias';
import MesasService from '../../services/mesas';
import AuthService from '../../services/auth';
import Input from '../../components/ui/Input';
import BtnPrimary from '../../components/ui/Btn-primary';
import BtnSecondary from '../../components/ui/Btn-secondary';
import BtnAdd from '../../components/ui/BtnAdd';
import Card from '../../components/ui/Card';

const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [activeTab, setActiveTab] = useState('productos');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        categoriaId: '',
        imagen: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [categoryFormData, setCategoryFormData] = useState({
        nombre: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProductos();
        loadCategorias();
        loadMesas();
    }, []);

    const loadProductos = async () => {
        try {
            const data = await ProductosService.getAll();
            setProductos(data);
        } catch (error) {
            setError('Error al cargar productos');
        }
    };

    const loadCategorias = async () => {
        try {
            const data = await CategoriasService.getAll();
            setCategorias(data);
        } catch (error) {
            setError('Error al cargar categorías');
        }
    };

    const loadMesas = async () => {
        try {
            console.log('Loading mesas...');
            const data = await MesasService.getAll();
            console.log('Mesas loaded:', data);
            setMesas(data);
        } catch (error) {
            console.error('Error loading mesas:', error);
            setError('Error al cargar mesas');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = AuthService.getToken();
            
            if (imageFile) {
                // Convert image to base64 for simple storage
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const productData = {
                        ...formData,
                        precio: parseFloat(formData.precio),
                        categoriaId: parseInt(formData.categoriaId),
                        imagen: reader.result
                    };

                    try {
                        if (editingProduct) {
                            await ProductosService.update(editingProduct.id, productData, token);
                        } else {
                            await ProductosService.create(productData, token);
                        }

                        setFormData({ nombre: '', precio: '', categoriaId: '', imagen: '' });
                        setImageFile(null);
                        setImagePreview('');
                        setShowForm(false);
                        setEditingProduct(null);
                        loadProductos();
                        toast.success(editingProduct ? 'Producto actualizado con éxito' : 'Producto creado con éxito');
                    } catch (error) {
                        setError('Error al guardar producto');
                    } finally {
                        setLoading(false);
                    }
                };
                reader.readAsDataURL(imageFile);
            } else {
                const productData = {
                    ...formData,
                    precio: parseFloat(formData.precio),
                    categoriaId: parseInt(formData.categoriaId)
                };

                if (editingProduct) {
                    await ProductosService.update(editingProduct.id, productData, token);
                } else {
                    await ProductosService.create(productData, token);
                }

                setFormData({ nombre: '', precio: '', categoriaId: '', imagen: '' });
                setImageFile(null);
                setImagePreview('');
                setShowForm(false);
                setEditingProduct(null);
                loadProductos();
                setLoading(false);
            }
        } catch (error) {
            setError('Error al guardar producto');
            setLoading(false);
        }
    };

    const handleEdit = async (producto) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Producto',
            html: `
                <style>
                    .swal2-input { 
                        width: 250px !important; 
                        height: 35px !important;
                        border: 2px solid #e5e7eb !important;
                        border-radius: 0.5rem !important;
                        padding: 0.5rem !important;
                        font-size: 1rem !important;
                    }
                    .swal2-input:focus {
                        border-color: #6147E8 !important;
                        outline: none !important;
                        box-shadow: 0 0 0 3px rgba(97, 71, 232, 0.1) !important;
                    }
                    #swal-input3 { margin-top: 15px !important; }
                    .swal2-confirm {
                        background-color: #6147E8 !important;
                        border: none !important;
                        border-radius: 0.5rem !important;
                        padding: 0.75rem 1.5rem !important;
                        font-weight: 500 !important;
                        transition: all 0.2s !important;
                    }
                    .swal2-confirm:hover {
                        background-color: #53589A !important;
                        transform: translateY(-1px) !important;
                    }
                    .swal2-cancel {
                        background-color: #6b7280 !important;
                        border: none !important;
                        color: white !important;
                        border-radius: 0.5rem !important;
                        padding: 0.75rem 1.5rem !important;
                        font-weight: 500 !important;
                        transition: all 0.2s !important;
                    }
                    .swal2-cancel:hover {
                        background-color: #4b5563 !important;
                        color: white !important;
                    }
                </style>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; text-align: left;">Nombre del producto:</label>
                <input id="swal-input1" class="swal2-input" placeholder="Nombre del producto" value="${producto.nombre}">
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Precio:</label>
                <input id="swal-input2" class="swal2-input" type="number" step="0.01" placeholder="Precio" value="${producto.precio}">
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Categoría:</label>
                <select id="swal-input3" class="swal2-input">
                    ${categorias.map(cat => `<option value="${cat.id}" ${cat.id === producto.categoriaId ? 'selected' : ''}>${cat.nombre}</option>`).join('')}
                </select>
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Nueva imagen (opcional):</label>
                <input id="swal-input4" class="swal2-input" type="file" accept="image/*" placeholder="Nueva imagen (opcional)">
            `,
            focusConfirm: false,
            confirmButtonColor: 'var(--color-primario)',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById('swal-input1').value;
                const precio = document.getElementById('swal-input2').value;
                const categoriaId = document.getElementById('swal-input3').value;
                const imagen = document.getElementById('swal-input4').files[0];
                
                if (!nombre || !precio || !categoriaId) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                
                return { nombre, precio: parseFloat(precio), categoriaId: parseInt(categoriaId), imagen };
            }
        });

        if (formValues) {
            try {
                setLoading(true);
                const token = AuthService.getToken();
                
                if (formValues.imagen) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const productData = { 
                            nombre: formValues.nombre,
                            precio: formValues.precio,
                            categoriaId: formValues.categoriaId,
                            imagen: reader.result
                        };
                        await ProductosService.update(producto.id, productData, token);
                        loadProductos();
                        toast.success('Producto actualizado con éxito');
                        setLoading(false);
                    };
                    reader.readAsDataURL(formValues.imagen);
                } else {
                    const productData = { 
                        nombre: formValues.nombre,
                        precio: formValues.precio,
                        categoriaId: formValues.categoriaId
                    };
                    await ProductosService.update(producto.id, productData, token);
                    loadProductos();
                    toast.success('Producto actualizado con éxito');
                    setLoading(false);
                }
            } catch (error) {
                toast.error('Error al actualizar producto');
                setLoading(false);
            }
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primario)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = AuthService.getToken();
                await ProductosService.delete(id, token);
                loadProductos();
                toast.success('Producto eliminado con éxito');
            } catch (error) {
                toast.error('Error al eliminar producto');
            }
        }
    };

    const resetForm = () => {
        setFormData({ nombre: '', precio: '', categoriaId: '', imagen: '' });
        setImageFile(null);
        setImagePreview('');
        setEditingProduct(null);
        setEditingCategory(null);
        setShowForm(false);
    };

    const showProductForm = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Producto',
            html: `
                <style>
                    .swal2-input { 
                        width: 250px !important; 
                        height: 35px !important;
                        border: 2px solid #e5e7eb !important;
                        border-radius: 0.5rem !important;
                        padding: 0.5rem !important;
                        font-size: 1rem !important;
                    }
                    .swal2-input:focus {
                        border-color: #6147E8 !important;
                        outline: none !important;
                        box-shadow: 0 0 0 3px rgba(97, 71, 232, 0.1) !important;
                    }
                    #swal-input3 { margin-top: 15px !important; }
                    .swal2-confirm {
                        background-color: #6147E8 !important;
                        border: none !important;
                        border-radius: 0.5rem !important;
                        padding: 0.75rem 1.5rem !important;
                        font-weight: 500 !important;
                        transition: all 0.2s !important;
                    }
                    .swal2-confirm:hover {
                        background-color: #53589A !important;
                        transform: translateY(-1px) !important;
                    }
                    .swal2-cancel {
                        background-color: #6b7280 !important;
                        border: none !important;
                        color: white !important;
                        border-radius: 0.5rem !important;
                        padding: 0.75rem 1.5rem !important;
                        font-weight: 500 !important;
                        transition: all 0.2s !important;
                    }
                    .swal2-cancel:hover {
                        background-color: #4b5563 !important;
                        color: white !important;
                    }
                </style>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; text-align: left;">Nombre del producto:</label>
                <input id="swal-input1" class="swal2-input" placeholder="Nombre del producto">
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Precio:</label>
                <input id="swal-input2" class="swal2-input" type="number" step="0.01" placeholder="Precio">
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Categoría:</label>
                <select id="swal-input3" class="swal2-input">
                    <option value="">Seleccionar categoría</option>
                    ${categorias.map(cat => `<option value="${cat.id}">${cat.nombre}</option>`).join('')}
                </select>
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Imagen del producto (opcional):</label>
                <input id="swal-input4" class="swal2-input" type="file" accept="image/*" placeholder="Imagen del producto">
            `,
            focusConfirm: false,
            confirmButtonColor: 'var(--color-primario)',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById('swal-input1').value;
                const precio = document.getElementById('swal-input2').value;
                const categoriaId = document.getElementById('swal-input3').value;
                const imagen = document.getElementById('swal-input4').files[0];
                
                if (!nombre || !precio || !categoriaId) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                
                return { nombre, precio: parseFloat(precio), categoriaId: parseInt(categoriaId), imagen };
            }
        });

        if (formValues) {
            try {
                setLoading(true);
                const token = AuthService.getToken();
                
                if (formValues.imagen) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const productData = { 
                            nombre: formValues.nombre,
                            precio: formValues.precio,
                            categoriaId: formValues.categoriaId,
                            imagen: reader.result
                        };
                        await ProductosService.create(productData, token);
                        loadProductos();
                        toast.success('Producto creado con éxito');
                        setLoading(false);
                    };
                    reader.readAsDataURL(formValues.imagen);
                } else {
                    const productData = { 
                        nombre: formValues.nombre,
                        precio: formValues.precio,
                        categoriaId: formValues.categoriaId
                    };
                    await ProductosService.create(productData, token);
                    loadProductos();
                    toast.success('Producto creado con éxito');
                    setLoading(false);
                }
            } catch (error) {
                toast.error('Error al crear producto');
                setLoading(false);
            }
        }
    };

    const showCategoryForm = async () => {
        const { value: nombre } = await Swal.fire({
            title: 'Agregar Categoría',
            input: 'text',
            inputPlaceholder: 'Nombre de la categoría',
            confirmButtonColor: 'var(--color-primario)',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6b7280',
            inputValidator: (value) => {
                if (!value) {
                    return 'El nombre es obligatorio';
                }
            }
        });

        if (nombre) {
            try {
                setLoading(true);
                const token = AuthService.getToken();
                await CategoriasService.create({ nombre }, token);
                loadCategorias();
                toast.success('Categoría creada con éxito');
                setLoading(false);
            } catch (error) {
                toast.error('Error al crear categoría');
                setLoading(false);
            }
        }
    };

    const showMesaForm = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Agregar Mesa',
            html: `
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; text-align: left;">Número de mesa:</label>
                <input id="swal-input1" class="swal2-input" type="number" placeholder="Número de mesa" min="1">
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Capacidad (personas):</label>
                <input id="swal-input2" class="swal2-input" type="number" placeholder="Capacidad" min="1" max="12">
            `,
            focusConfirm: false,
            confirmButtonColor: 'var(--color-primario)',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6b7280',
            preConfirm: () => {
                const numero = document.getElementById('swal-input1').value;
                const capacidad = document.getElementById('swal-input2').value;
                
                if (!numero || !capacidad) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                
                return { numero: parseInt(numero), capacidad: parseInt(capacidad) };
            }
        });

        if (formValues) {
            try {
                setLoading(true);
                const token = AuthService.getToken();
                await MesasService.create(formValues, token);
                loadMesas();
                toast.success('Mesa creada con éxito');
                setLoading(false);
            } catch (error) {
                toast.error('Error al crear mesa');
                setLoading(false);
            }
        }
    };

    const handleEditMesa = async (mesa) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Mesa',
            html: `
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; text-align: left;">Número de mesa:</label>
                <input id="swal-input1" class="swal2-input" type="number" placeholder="Número de mesa" value="${mesa.numero}" min="1">
                <label style="display: block; margin-bottom: 0.5rem; margin-top: 1rem; font-weight: bold; text-align: left;">Capacidad (personas):</label>
                <input id="swal-input2" class="swal2-input" type="number" placeholder="Capacidad" value="${mesa.capacidad}" min="1" max="12">
            `,
            focusConfirm: false,
            confirmButtonColor: 'var(--color-primario)',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6b7280',
            preConfirm: () => {
                const numero = document.getElementById('swal-input1').value;
                const capacidad = document.getElementById('swal-input2').value;
                
                if (!numero || !capacidad) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                
                return { numero: parseInt(numero), capacidad: parseInt(capacidad) };
            }
        });

        if (formValues) {
            try {
                setLoading(true);
                const token = AuthService.getToken();
                await MesasService.update(mesa.id, formValues, token);
                loadMesas();
                toast.success('Mesa actualizada con éxito');
                setLoading(false);
            } catch (error) {
                toast.error('Error al actualizar mesa');
                setLoading(false);
            }
        }
    };

    const handleDeleteMesa = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primario)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = AuthService.getToken();
                await MesasService.delete(id, token);
                loadMesas();
                toast.success('Mesa eliminada con éxito');
            } catch (error) {
                toast.error('Error al eliminar mesa');
            }
        }
    };

    const handleToggleEstado = async (mesa) => {
        try {
            setLoading(true);
            const token = AuthService.getToken();
            const nuevoEstado = mesa.estado === 'ocupada' ? 'disponible' : 'ocupada';
            
            console.log('Toggling mesa:', { mesa, nuevoEstado });
            console.log('Sending data:', { estado: nuevoEstado });
            
            const result = await MesasService.update(mesa.id, { estado: nuevoEstado }, token);
            console.log('Update result:', result);
            
            loadMesas();
            toast.success(`Mesa ${nuevoEstado === 'ocupada' ? 'ocupada' : 'liberada'} con éxito`);
            setLoading(false);
        } catch (error) {
            console.error('Error toggling mesa estado:', error);
            toast.error('Error al cambiar estado de mesa');
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        setCategoryFormData({ ...categoryFormData, [e.target.name]: e.target.value });
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = AuthService.getToken();
            if (editingCategory) {
                await CategoriasService.update(editingCategory.id, categoryFormData, token);
            } else {
                await CategoriasService.create(categoryFormData, token);
            }

            setCategoryFormData({ nombre: '' });
            setShowForm(false);
            setEditingCategory(null);
            loadCategorias();
            toast.success(editingCategory ? 'Categoría actualizada con éxito' : 'Categoría creada con éxito');
        } catch (error) {
            console.error('Category save error:', error);
            setError(error.message || 'Error al guardar categoría');
        } finally {
            setLoading(false);
        }
    };

    const handleEditCategory = async (categoria) => {
        const { value: nombre } = await Swal.fire({
            title: 'Editar Categoría',
            input: 'text',
            inputValue: categoria.nombre,
            inputPlaceholder: 'Nombre de la categoría',
            confirmButtonColor: 'var(--color-primario)',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6b7280',
            inputValidator: (value) => {
                if (!value) {
                    return 'El nombre es obligatorio';
                }
            }
        });

        if (nombre) {
            try {
                setLoading(true);
                const token = AuthService.getToken();
                await CategoriasService.update(categoria.id, { nombre }, token);
                loadCategorias();
                toast.success('Categoría actualizada con éxito');
                setLoading(false);
            } catch (error) {
                toast.error('Error al actualizar categoría');
                setLoading(false);
            }
        }
    };

    const handleDeleteCategory = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primario)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = AuthService.getToken();
                await CategoriasService.delete(id, token);
                loadCategorias();
                toast.success('Categoría eliminada con éxito');
            } catch (error) {
                toast.error('Error al eliminar categoría');
            }
        }
    };

    return (
        <div className="p-5 mobile-p-3">
            <div className="d-flex mobile-flex-col justify-between mobile-justify-center align-center mobile-align-start mb-4 mobile-gap-3">
                <h1 className="mobile-text-center"><b>Dashboard - Administración</b></h1>
                <div className="d-flex gap-3 mobile-w-full mobile-justify-center align-center">
                    <a href="/" style={{
                        color: 'var(--color-primario)',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        padding: '0.5rem 1rem',
                        border: '2px solid var(--color-primario)',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s'
                    }}>Volver al Inicio</a>
                    <button
                        onClick={() => setActiveTab('productos')}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'productos' ? 'var(--color-primario)' : '#f3f4f6',
                            color: activeTab === 'productos' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            flex: window.innerWidth <= 768 ? '1' : 'none'
                        }}
                    >
                        Productos
                    </button>
                    <button
                        onClick={() => setActiveTab('categorias')}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'categorias' ? 'var(--color-primario)' : '#f3f4f6',
                            color: activeTab === 'categorias' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            flex: window.innerWidth <= 768 ? '1' : 'none'
                        }}
                    >
                        Categorías
                    </button>
                    <button
                        onClick={() => setActiveTab('mesas')}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: activeTab === 'mesas' ? 'var(--color-primario)' : '#f3f4f6',
                            color: activeTab === 'mesas' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            flex: window.innerWidth <= 768 ? '1' : 'none'
                        }}
                    >
                        Mesas
                    </button>
                </div>
            </div>

            <div className="d-flex mobile-flex-col justify-between mobile-justify-center align-center mobile-align-start mb-4 mobile-gap-3">
                <h2 className="mobile-text-center"><b>{activeTab === 'productos' ? 'Gestión de Productos' : activeTab === 'categorias' ? 'Gestión de Categorías' : 'Gestión de Mesas'}</b></h2>
                <BtnAdd onClick={() => activeTab === 'productos' ? showProductForm() : activeTab === 'categorias' ? showCategoryForm() : showMesaForm()} className="mobile-w-full">
                    {activeTab === 'productos' ? 'Agregar Producto' : activeTab === 'categorias' ? 'Agregar Categoría' : 'Agregar Mesa'}
                </BtnAdd>
            </div>

            {error && <p style={{color: 'red'}} className="mb-3">{error}</p>}

            {showForm && activeTab === 'productos' && (
                <Card className="mb-4 p-4">
                    <h2><b>{editingProduct ? 'Editar' : 'Agregar'} Producto</b></h2>
                    <form onSubmit={handleSubmit} className="d-flex flex-col gap-3">
                        <Input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del producto"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            value={formData.precio}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                        <select
                            name="categoriaId"
                            value={formData.categoriaId}
                            onChange={handleChange}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                fontSize: '1rem'
                            }}
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Imagen del producto:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{
                                    padding: '0.75rem',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    width: '100%'
                                }}
                            />
                            {imagePreview && (
                                <div style={{ marginTop: '1rem' }}>
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        style={{ 
                                            maxWidth: '200px', 
                                            maxHeight: '200px', 
                                            objectFit: 'cover',
                                            borderRadius: '0.5rem'
                                        }} 
                                    />
                                </div>
                            )}
                        </div>
                        <div className="d-flex gap-3">
                            <BtnPrimary type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </BtnPrimary>
                            <BtnSecondary type="button" onClick={resetForm}>
                                Cancelar
                            </BtnSecondary>
                        </div>
                    </form>
                </Card>
            )}

            {showForm && activeTab === 'categorias' && (
                <Card className="mb-4 p-4">
                    <h2><b>{editingCategory ? 'Editar' : 'Agregar'} Categoría</b></h2>
                    <form onSubmit={handleCategorySubmit} className="d-flex flex-col gap-3">
                        <Input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la categoría"
                            value={categoryFormData.nombre}
                            onChange={handleCategoryChange}
                            required
                        />

                        <div className="d-flex gap-3">
                            <BtnPrimary type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </BtnPrimary>
                            <BtnSecondary type="button" onClick={resetForm}>
                                Cancelar
                            </BtnSecondary>
                        </div>
                    </form>
                </Card>
            )}

            {activeTab === 'productos' && (
                <div className="d-flex flex-col gap-3">
                {productos.map(producto => (
                    <Card key={producto.id} className="p-4">
                        <div className="d-flex mobile-flex-col justify-between mobile-justify-start align-center mobile-align-start mobile-gap-3">
                            <div className="d-flex gap-3 align-center mobile-w-full">
                                {producto.imagen && (
                                    <img 
                                        src={producto.imagen} 
                                        alt={producto.nombre}
                                        style={{ 
                                            width: window.innerWidth <= 768 ? '60px' : '80px', 
                                            maxHeight: window.innerWidth <= 768 ? '60px' : '80px',
                                            objectFit: 'contain',
                                            borderRadius: '0.5rem'
                                        }} 
                                    />
                                )}
                                <div className="mobile-w-full">
                                    <h3><b>{producto.nombre}</b></h3>
                                    <p><b>Precio: ${producto.precio}</b></p>
                                    <p>Categoría: {producto.categoria?.nombre}</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mobile-w-full mobile-justify-center">
                                <BtnSecondary onClick={() => handleEdit(producto)} >
                                    Editar
                                </BtnSecondary>
                                <button
                                    onClick={() => handleDelete(producto.id)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        flex: window.innerWidth <= 768 ? '1' : 'none'
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
                </div>
            )}

            {activeTab === 'categorias' && (
                <div className="d-flex flex-col gap-3">
                    {categorias.map(categoria => (
                        <Card key={categoria.id} className="p-4">
                            <div className="d-flex justify-between align-center">
                                <div>
                                    <h3><b>{categoria.nombre}</b></h3>
                                </div>
                                <div className="d-flex gap-2">
                                    <BtnSecondary onClick={() => handleEditCategory(categoria)}>
                                        Editar
                                    </BtnSecondary>
                                    <button
                                        onClick={() => handleDeleteCategory(categoria.id)}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === 'mesas' && (
                <div className="d-flex flex-col gap-3">
                    {mesas.map(mesa => (
                        <Card key={mesa.id} className="p-4">
                            <div className="d-flex justify-between align-center">
                                <div>
                                    <h3><b>Mesa {mesa.numero}</b></h3>
                                    <p>Capacidad: {mesa.capacidad} personas</p>
                                    <p>Estado: {mesa.estado === 'ocupada' ? 'Ocupada' : 'Disponible'}</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        onClick={() => handleToggleEstado(mesa)}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            backgroundColor: mesa.estado === 'ocupada' ? '#10b981' : '#f59e0b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {mesa.estado === 'ocupada' ? 'Liberar' : 'Ocupar'}
                                    </button>
                                    <BtnSecondary onClick={() => handleEditMesa(mesa)}>
                                        Editar
                                    </BtnSecondary>
                                    <button
                                        onClick={() => handleDeleteMesa(mesa.id)}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;