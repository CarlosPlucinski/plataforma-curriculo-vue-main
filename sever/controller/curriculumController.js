const Curriculum = require('../models/curriculumModel');

/**
 * @desc    Busca o currículo do usuário logado
 * @route   GET /api/curriculum
 * @access  Private
 */
exports.getCurriculum = async (req, res) => {
  try {
    // req.user.id virá do seu middleware de autenticação
    const curriculum = await Curriculum.findOne({ user: req.user.id });

    if (!curriculum) {
      return res.status(404).json({ message: 'Currículo não encontrado.' });
    }

    res.status(200).json(curriculum);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o currículo.', error: error.message });
  }
};

/**
 * @desc    Cria ou atualiza o currículo do usuário
 * @route   POST /api/curriculum
 * @access  Private
 */
exports.createOrUpdateCurriculum = async (req, res) => {
  try {
    const curriculumData = {
      user: req.user.id,
      ...req.body 
    };

    // 'upsert: true' cria o documento se ele não existir
    // 'new: true' retorna o documento modificado em vez do original
    const updatedCurriculum = await Curriculum.findOneAndUpdate(
      { user: req.user.id },
      curriculumData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ message: 'Currículo salvo com sucesso!', data: updatedCurriculum });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o currículo.', error: error.message });
  }
};

/**
 * @desc    Deleta o currículo do usuário logado
 * @route   DELETE /api/curriculum
 * @access  Private
 */
exports.deleteCurriculum = async (req, res) => {
    try {
        const curriculum = await Curriculum.findOneAndDelete({ user: req.user.id });

        if (!curriculum) {
            return res.status(404).json({ message: 'Currículo não encontrado para deletar.' });
        }

        res.status(200).json({ message: 'Currículo deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o currículo.', error: error.message });
    }
};