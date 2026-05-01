import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, MapPin } from "lucide-react";
import { citiesApi } from "../../api/cities.js";
import toast from "react-hot-toast";

export default function AdminCitiesPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState(null);
    const [formData, setFormData] = useState({
        name: "", state: "", country: "", slug: "", description: "", history: "", economy: "", population: "", latitude: "", longitude: "",
    });

    const { data, isLoading } = useQuery({
        queryKey: ["admin-cities", search],
        queryFn: () => citiesApi.list({ search, limit: 50 }),
    });

    const createMutation = useMutation({
        mutationFn: citiesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
            toast.success("Cidade criada com sucesso!");
            closeModal();
        },
        onError: (err) => toast.error(err.response?.data?.message || "Erro ao criar cidade"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => citiesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
            toast.success("Cidade atualizada!");
            closeModal();
        },
        onError: (err) => toast.error(err.response?.data?.message || "Erro ao atualizar"),
    });

    const deleteMutation = useMutation({
        mutationFn: citiesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
            toast.success("Cidade removida!");
        },
        onError: (err) => toast.error(err.response?.data?.message || "Erro ao remover"),
    });

    const cities = data?.data?.data || [];

    const openModal = (city = null) => {
        if (city) {
            setEditingCity(city);
            setFormData({
                name: city.name, state: city.state, country: city.country, slug: city.slug,
                description: city.description, history: city.history || "", economy: city.economy || "",
                population: city.population || "", latitude: city.latitude || "", longitude: city.longitude || "",
            });
        } else {
            setEditingCity(null);
            setFormData({ name: "", state: "", country: "", slug: "", description: "", history: "", economy: "", population: "", latitude: "", longitude: "" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCity(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            population: formData.population ? parseInt(formData.population) : null,
            latitude: formData.latitude ? parseFloat(formData.latitude) : null,
            longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        };
        if (editingCity) {
            updateMutation.mutate({ id: editingCity.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-primary-950">Cidades</h1>
                    <p className="text-slate-500 mt-1">Gerencie as cidades da Rota Bioceânica</p>
                </div>
                <button onClick={() => openModal()} className="btn-primary">
                    <Plus className="w-5 h-5 mr-2" /> Nova Cidade
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar cidades..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-slate-400">Carregando...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cidade</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">País</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">População</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {cities.map((city) => (
                                    <tr key={city.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                                                    <MapPin className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-primary-950">{city.name}</p>
                                                    <p className="text-xs text-slate-500">{city.state}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{city.country}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{city.population?.toLocaleString() || "—"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openModal(city)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-colors">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deleteMutation.mutate(city.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="font-display text-xl font-bold text-primary-950">{editingCity ? "Editar" : "Nova"} Cidade</h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Nome</label><input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Slug</label><input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Estado/Província</label><input required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">País</label><input required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">População</label><input type="number" value={formData.population} onChange={(e) => setFormData({ ...formData, population: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label><input type="number" step="any" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label><input type="number" step="any" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label><textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">História</label><textarea rows={3} value={formData.history} onChange={(e) => setFormData({ ...formData, history: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Economia</label><textarea rows={3} value={formData.economy} onChange={(e) => setFormData({ ...formData, economy: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Cancelar</button>
                                <button type="submit" className="btn-primary">{editingCity ? "Salvar" : "Criar"}</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
