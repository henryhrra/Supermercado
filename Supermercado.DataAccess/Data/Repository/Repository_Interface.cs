using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace SuperMercado.AccesoDatos.Data.Repository
{
    //public al metodo
    public interface Repository_Interface<T> where T : class
    {
        //obtener un registro
        T Get(int id);

        //obtener todos los registros ordenados o filtrados
        IEnumerable<T> GetAll(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = null
        );
        //obtener el primero o per defecto que encuentre
        T GetFirstOrDefault(
            Expression<Func<T, bool>> filter = null,
            string includeProperties = null
        );

        //para agregar registros
        void Add(T entity);

        //para remover por id
        void Remove(int id);

        //para remover por identidad
        void Remove(T entity);
    }
}
