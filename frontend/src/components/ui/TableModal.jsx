import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import MesasService from '../../services/mesas';
import BtnPrimary from './Btn-primary';
import BtnSecondary from './Btn-secondary';

const TableModal = ({ isOpen, onClose }) => {
    const { setTable, tableInfo } = useCart();
    const [selectedTable, setSelectedTable] = useState(tableInfo.tableNumber || null);
    const [diners, setDiners] = useState(tableInfo.diners || 2);
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadTables();
        }
    }, [isOpen]);

    const loadTables = async () => {
        setLoading(true);
        try {
            const mesasData = await MesasService.getAll();
            // Transform API data to include visual positioning
            const tablesWithPosition = mesasData.map((mesa, index) => {
                const row = Math.floor(index / 4);
                const col = index % 4;
                return {
                    id: mesa.numero,
                    capacity: mesa.capacidad,
                    occupied: mesa.estado === 'ocupada',
                    x: col * 1 + 1,
                    y: row * 1 + 1
                };
            });
            setTables(tablesWithPosition);
        } catch (error) {
            console.error('Error loading tables:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableClick = (table) => {
        if (!table.occupied) {
            setSelectedTable(table.id);
            setDiners(Math.min(diners, table.capacity));
        }
    };

    const handleConfirm = () => {
        if (selectedTable && diners >= 1) {
            setTable(selectedTable, diners);
            onClose();
        }
    };

    const getTableStyle = (table) => {
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 1 : 1;
        const spacing = isMobile ? 50 : 80;
        
        const baseStyle = {
            position: 'absolute',
            left: `${table.x * spacing * scale}px`,
            top: `${table.y * spacing * scale}px`,
            width: (table.capacity <= 2 ? 50 : table.capacity <= 4 ? 70 : 90) * scale + 'px',
            height: (table.capacity <= 2 ? 50 : table.capacity <= 4 ? 70 : 90) * scale + 'px',
            borderRadius: table.capacity <= 2 ? '50%' : '10px',
            border: '2px solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: table.occupied ? 'not-allowed' : 'pointer',
            fontSize: isMobile ? '10px' : '12px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
        };

        if (table.occupied) {
            return {
                ...baseStyle,
                backgroundColor: '#fee2e2',
                borderColor: '#dc2626',
                color: '#dc2626'
            };
        } else if (selectedTable === table.id) {
            return {
                ...baseStyle,
                backgroundColor: 'var(--color-primario)',
                borderColor: 'var(--color-primario)',
                color: 'white'
            };
        } else {
            return {
                ...baseStyle,
                backgroundColor: '#f0fdf4',
                borderColor: '#16a34a',
                color: '#16a34a'
            };
        }
    };

    if (!isOpen) return null;

    const selectedTableData = tables.find(t => t.id === selectedTable);

    return (
        <>
            {/* Overlay */}
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={onClose}
            >
                {/* Modal */}
                <div 
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        padding: window.innerWidth <= 768 ? '1rem' : '2rem',
                        width: window.innerWidth <= 768 ? '95vw' : '600px',
                        maxWidth: '95vw',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                        <b>Seleccionar Mesa</b>
                    </h2>
                    
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>Cargando mesas...</p>
                        </div>
                    )}
                    
                    {!loading && tables.length > 0 && (
                        <>
                        {/* Legend */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: window.innerWidth <= 768 ? '1rem' : '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '4px' }}></div>
                            <span style={{ fontSize: '14px' }}>Disponible</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: '#fee2e2', border: '2px solid #dc2626', borderRadius: '4px' }}></div>
                            <span style={{ fontSize: '14px' }}>Ocupada</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--color-primario)', border: '2px solid var(--color-primario)', borderRadius: '4px' }}></div>
                            <span style={{ fontSize: '14px' }}>Seleccionada</span>
                        </div>
                    </div>

                    {/* Restaurant Floor Plan */}
                    <div style={{
                        position: 'relative',
                        width: window.innerWidth <= 768 ? '100%' : '500px',
                        height: window.innerWidth <= 768 ? '300px' : '400px',
                        margin: '0 auto 2rem',
                        backgroundColor: '#f9fafb',
                        border: '2px solid #e5e7eb',
                        borderRadius: '1rem',
                        overflow: 'auto'
                    }}>
                        {tables.map(table => (
                            <div
                                key={table.id}
                                style={getTableStyle(table)}
                                onClick={() => handleTableClick(table)}
                                title={`Mesa ${table.id} - Capacidad: ${table.capacity} personas`}
                            >
                                {table.id}
                            </div>
                        ))}
                    </div>

                    {/* Selected Table Info */}
                    {selectedTableData && (
                        <div style={{
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #16a34a',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            <p><b>Mesa {selectedTableData.id} seleccionada</b></p>
                            <p style={{ fontSize: '14px', color: '#16a34a' }}>Capacidad máxima: {selectedTableData.capacity} personas</p>
                        </div>
                    )}

                    {/* Diners Selector */}
                    {selectedTableData && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                                Número de Comensales:
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {[...Array(selectedTableData.capacity)].map((_, i) => {
                                    const num = i + 1;
                                    return (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setDiners(num)}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                border: '2px solid',
                                                backgroundColor: diners === num ? 'var(--color-primario)' : 'white',
                                                borderColor: diners === num ? 'var(--color-primario)' : '#e5e7eb',
                                                color: diners === num ? 'white' : '#374151',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {num}
                                        </button>
                                    );
                                })}
                            </div>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
                                Máximo {diners * 4} productos para {diners} comensal{diners > 1 ? 'es' : ''}
                            </p>
                        </div>
                    )}
                    </>
                    )}
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <BtnPrimary 
                            onClick={handleConfirm} 
                            disabled={!selectedTable}
                            style={{ flex: 1, opacity: selectedTable ? 1 : 0.5 }}
                        >
                            Confirmar Mesa
                        </BtnPrimary>
                        <BtnSecondary onClick={onClose} style={{ flex: 1 }}>
                            Cancelar
                        </BtnSecondary>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableModal;